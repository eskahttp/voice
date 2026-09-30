# Moving dianavoice.online to a new host

Runbook for moving the whole stack to a fresh VPS. Last done 2026-09-30:
SporeStack Stockholm `195.72.61.232` → ER-Telecom Moscow `93.183.104.169`.

Everything runs from the developer machine. `OLD` and `NEW` are the two hosts.

## Before you start

- **Always pass the key explicitly:** `ssh -i ~/.ssh/voice -o IdentitiesOnly=yes`.
  Without it ssh offers every key in your agent. Each wrong key counts as a
  failed login, and fail2ban bans you for 24h after 3.
- **SSH is rate-limited** (`ufw limit`): the 6th connection within 30s is
  refused. Reuse one connection:

  ```bash
  ssh -i ~/.ssh/voice -o IdentitiesOnly=yes -o ServerAliveInterval=30 \
      -o ControlMaster=yes -o ControlPath=/tmp/ssh-voice -o ControlPersist=4h -fN root@NEW
  ssh -o ControlPath=/tmp/ssh-voice root@NEW    # every later command
  ```

- **A push to `main` deploys** (GitHub Actions). Once the secrets point at NEW,
  every merge goes there, so land the repo changes first (step 9).

## 1. Order the box

Ubuntu 24.04, ≥2 GB RAM, ≥30 GB disk. The Next.js build runs on the box and
needs the RAM; Docker build cache eats the disk (`docker builder prune` reclaims it).

The host must be reachable from RU: most users are there. RU-hosted boxes or
TSPU-clean foreign ASNs work. Vultr, DigitalOcean, Hetzner, OVH do not.

## 2. Key-only access

If the provider only gives a root password, use it once to install the key:

```bash
ssh-copy-id -i ~/.ssh/voice.pub root@NEW
```

Then copy `/etc/ssh/sshd_config.d/00-hardening.conf` from OLD. sshd takes the
**first** value it sees, and cloud-init's `50-cloud-init.conf` says
`PasswordAuthentication yes`, so the `00-` prefix is what makes it win. Also flip
that line to `no`, then:

```bash
sshd -t && systemctl reload ssh
echo "root:$(openssl rand -base64 33)" | chpasswd   # the old password was shared in plain text
sshd -T | grep passwordauth                          # must say: no
```

## 3. Base system

Copy these from OLD unchanged:

| File | Why |
|---|---|
| `/etc/sysctl.d/99-tuning.conf` | UDP buffers, conntrack size, reserves LiveKit's port range |
| `/etc/sysctl.d/99-swap.conf` | swappiness 10 |
| `/etc/docker/daemon.json` | log rotation, no userland-proxy |
| `/etc/fail2ban/jail.local` | sshd jail, bans via ufw |

Then: install `ufw fail2ban unattended-upgrades rsync` and Docker from
`download.docker.com`, add a 4 GB `/swapfile` (the provider's may be tiny;
check `swapon --show`), and recreate the firewall:

```bash
ufw default deny incoming; ufw default allow outgoing
ufw limit 22/tcp
ufw allow 80/tcp; ufw allow 443/tcp; ufw allow 443/udp
ufw allow 7881/tcp; ufw allow 50000:50100/udp
ufw --force enable
```

Reboot once to prove it all comes back: swap, ufw, sysctls, `sshd -T`.

## 4. Network interface name

`livekit/livekit.prod.yaml` pins the NIC by name. Check it on NEW:

```bash
ip -br link    # e.g. ens3, eth0
```

**A wrong name does not error.** Signalling works, the page loads, but calls
have no audio. Fix the file before deploying.

## 5. Back up OLD

Each command is one file. Keep the folder out of git: `.env.production` holds secrets.

```bash
S="ssh -o ControlPath=/tmp/ssh-voice-old root@OLD"
$S 'docker exec postgres pg_dump -U voice -d voice -Fc'                   > voice.pgdump
$S 'docker exec nextjs tar -C /app -cf - uploads'                         > uploads.tar
$S 'tar -C /var/lib/docker/volumes/voice_caddy_data/_data -czf - .'       > caddy_data.tgz
$S 'cat /opt/voice/.env.production'                                       > env.production
```

`caddy_data` carries the TLS certs. Without it NEW requests new ones, and Let's
Encrypt allows only 5 duplicate certificates per week.

## 6. Ship code and restore

```bash
RSYNC_RSH="ssh -o ControlPath=/tmp/ssh-voice" scripts/deploy-sync.sh root@NEW
scp -o ControlPath=/tmp/ssh-voice env.production root@NEW:/opt/voice/.env.production
scp -o ControlPath=/tmp/ssh-voice voice.pgdump uploads.tar caddy_data.tgz root@NEW:/root/
```

On NEW, in `/opt/voice`, with
`C="docker compose --env-file .env.production -f docker-compose.prod.yml"`:

```bash
chmod 600 .env.production
$C up -d db
docker exec -i postgres pg_restore -U voice -d voice --no-owner --exit-on-error < /root/voice.pgdump
$C create                        # creates the named volumes (and builds the image)
docker run --rm -v voice_uploads:/d -v /root:/s:ro alpine \
  sh -c 'tar -C /d --strip-components=1 -xf /s/uploads.tar && chown -R 1000:1000 /d'
docker run --rm -v voice_caddy_data:/d -v /root:/s:ro alpine \
  sh -c 'tar -C /d -xzf /s/caddy_data.tgz'
$C up -d --build
```

The restore must happen **before** nextjs starts: `server.mjs` migrates on boot.
`docker logs nextjs` should say `No migrations to run!`. Uploads belong to uid
1000 because the app runs as the image's `node` user.

## 7. Test NEW before DNS

`--resolve` sends the request to NEW without touching DNS:

```bash
R=(--resolve dianavoice.online:443:NEW --resolve www.dianavoice.online:443:NEW --resolve dianavoice.online:80:NEW)
curl -sI "${R[@]}" http://dianavoice.online            # 308
curl -sI "${R[@]}" https://dianavoice.online           # 200
curl -sI "${R[@]}" https://www.dianavoice.online       # 301
curl -s  "${R[@]}" 'https://dianavoice.online/socket.io/?EIO=4&transport=polling'   # sid
curl -s -o /dev/null -w '%{http_code}\n' "${R[@]}" https://dianavoice.online/rtc/validate   # 401
docker logs livekit | grep nodeIP     # must be NEW's public IP
```

For a real call, add `NEW dianavoice.online` to `/etc/hosts` on a laptop, and
test from a RU connection.

## 8. Cutover

The DB is small; a short freeze is simpler than syncing two live copies.

1. OLD: `docker stop nextjs` (site down from here on).
2. Repeat step 5 for `voice.pgdump` and `uploads.tar` only.
3. NEW: `docker stop nextjs`, then
   `pg_restore --clean --if-exists --no-owner -U voice -d voice`, re-extract
   uploads, `docker start nextjs`.
4. DNS at Beget: A records for `dianavoice.online` **and** `www` → NEW.
   TTL is 600s, so allow ~10 minutes.
5. `dig +short dianavoice.online @1.1.1.1` shows NEW → re-run step 7 without `--resolve`.

## 9. After cutover

- Update the IP in `DEPLOY.md` and `.github/workflows/deploy.yml` (`DEPLOY_HOST`).
- Copy the `github-actions deploy` line from OLD's `~/.ssh/authorized_keys`
  to NEW's.
- Refresh the known-hosts secret, then push. The deploy run is the end-to-end test:

  ```bash
  ssh-keyscan NEW 2>/dev/null | gh secret set DEPLOY_KNOWN_HOSTS
  ```

- Keep OLD a few days untouched as a rollback (point DNS back), then delete it.

---

# Переезд dianavoice.online на новый хост

Инструкция по переносу всего стека на свежий VPS. Последний раз: 2026-09-30,
SporeStack Stockholm `195.72.61.232` → ER-Telecom Moscow `93.183.104.169`.

Всё выполняется с машины разработчика. `OLD` и `NEW` — старый и новый хосты.

## Перед началом

- **Всегда указывай ключ явно:** `ssh -i ~/.ssh/voice -o IdentitiesOnly=yes`.
  Иначе ssh перебирает все ключи из агента. Каждый неверный ключ — это неудачный
  вход, и после 3 fail2ban банит на 24 часа.
- **SSH ограничен по частоте** (`ufw limit`): 6-е подключение за 30 секунд
  отклоняется. Используй одно подключение повторно:

  ```bash
  ssh -i ~/.ssh/voice -o IdentitiesOnly=yes -o ServerAliveInterval=30 \
      -o ControlMaster=yes -o ControlPath=/tmp/ssh-voice -o ControlPersist=4h -fN root@NEW
  ssh -o ControlPath=/tmp/ssh-voice root@NEW    # все следующие команды
  ```

- **Push в `main` запускает деплой** (GitHub Actions). Как только секреты
  указывают на NEW, каждый merge уезжает туда, поэтому сначала влей изменения
  в репозиторий (шаг 9).

## 1. Заказать сервер

Ubuntu 24.04, ≥2 ГБ RAM, ≥30 ГБ диска. Сборка Next.js идёт на самом сервере и
требует памяти; кэш сборки Docker занимает диск (`docker builder prune` освобождает).

Сервер должен быть доступен из РФ: большинство пользователей там. Подходят
российские хостеры или зарубежные ASN без блокировок ТСПУ. Vultr, DigitalOcean,
Hetzner, OVH не подходят.

## 2. Доступ только по ключу

Если хостер выдал только пароль root, используй его один раз, чтобы поставить ключ:

```bash
ssh-copy-id -i ~/.ssh/voice.pub root@NEW
```

Затем скопируй `/etc/ssh/sshd_config.d/00-hardening.conf` с OLD. sshd берёт
**первое** встреченное значение, а `50-cloud-init.conf` от cloud-init содержит
`PasswordAuthentication yes`, поэтому выигрывает именно префикс `00-`. Эту строку
тоже переключи на `no`, затем:

```bash
sshd -t && systemctl reload ssh
echo "root:$(openssl rand -base64 33)" | chpasswd   # старый пароль передавался открытым текстом
sshd -T | grep passwordauth                          # должно быть: no
```

## 3. Базовая система

Скопируй с OLD без изменений:

| Файл | Зачем |
|---|---|
| `/etc/sysctl.d/99-tuning.conf` | UDP-буферы, размер conntrack, резерв портов LiveKit |
| `/etc/sysctl.d/99-swap.conf` | swappiness 10 |
| `/etc/docker/daemon.json` | ротация логов, без userland-proxy |
| `/etc/fail2ban/jail.local` | jail для sshd, баны через ufw |

Затем: установи `ufw fail2ban unattended-upgrades rsync` и Docker из
`download.docker.com`, добавь `/swapfile` на 4 ГБ (у хостера он может быть
крошечным; проверь `swapon --show`) и заново настрой файрвол:

```bash
ufw default deny incoming; ufw default allow outgoing
ufw limit 22/tcp
ufw allow 80/tcp; ufw allow 443/tcp; ufw allow 443/udp
ufw allow 7881/tcp; ufw allow 50000:50100/udp
ufw --force enable
```

Перезагрузи один раз и убедись, что всё поднялось: swap, ufw, sysctl, `sshd -T`.

## 4. Имя сетевого интерфейса

`livekit/livekit.prod.yaml` привязан к сетевой карте по имени. Проверь на NEW:

```bash
ip -br link    # например, ens3 или eth0
```

**Неверное имя не вызывает ошибку.** Сигналинг работает, страница открывается,
но в звонках нет звука. Исправь файл до деплоя.

## 5. Бэкап OLD

Каждая команда — один файл. Держи папку вне git: в `.env.production` секреты.

```bash
S="ssh -o ControlPath=/tmp/ssh-voice-old root@OLD"
$S 'docker exec postgres pg_dump -U voice -d voice -Fc'                   > voice.pgdump
$S 'docker exec nextjs tar -C /app -cf - uploads'                         > uploads.tar
$S 'tar -C /var/lib/docker/volumes/voice_caddy_data/_data -czf - .'       > caddy_data.tgz
$S 'cat /opt/voice/.env.production'                                       > env.production
```

В `caddy_data` лежат TLS-сертификаты. Без него NEW запросит новые, а Let's
Encrypt выдаёт только 5 одинаковых сертификатов в неделю.

## 6. Код и восстановление

```bash
RSYNC_RSH="ssh -o ControlPath=/tmp/ssh-voice" scripts/deploy-sync.sh root@NEW
scp -o ControlPath=/tmp/ssh-voice env.production root@NEW:/opt/voice/.env.production
scp -o ControlPath=/tmp/ssh-voice voice.pgdump uploads.tar caddy_data.tgz root@NEW:/root/
```

На NEW, в `/opt/voice`, с
`C="docker compose --env-file .env.production -f docker-compose.prod.yml"`:

```bash
chmod 600 .env.production
$C up -d db
docker exec -i postgres pg_restore -U voice -d voice --no-owner --exit-on-error < /root/voice.pgdump
$C create                        # создаёт именованные тома (и собирает образ)
docker run --rm -v voice_uploads:/d -v /root:/s:ro alpine \
  sh -c 'tar -C /d --strip-components=1 -xf /s/uploads.tar && chown -R 1000:1000 /d'
docker run --rm -v voice_caddy_data:/d -v /root:/s:ro alpine \
  sh -c 'tar -C /d -xzf /s/caddy_data.tgz'
$C up -d --build
```

Восстановление должно пройти **до** запуска nextjs: `server.mjs` применяет
миграции при старте. В `docker logs nextjs` должно быть `No migrations to run!`.
Владелец загрузок — uid 1000, потому что приложение работает от пользователя
`node` из образа.

## 7. Проверка NEW до DNS

`--resolve` отправляет запрос на NEW, не трогая DNS:

```bash
R=(--resolve dianavoice.online:443:NEW --resolve www.dianavoice.online:443:NEW --resolve dianavoice.online:80:NEW)
curl -sI "${R[@]}" http://dianavoice.online            # 308
curl -sI "${R[@]}" https://dianavoice.online           # 200
curl -sI "${R[@]}" https://www.dianavoice.online       # 301
curl -s  "${R[@]}" 'https://dianavoice.online/socket.io/?EIO=4&transport=polling'   # sid
curl -s -o /dev/null -w '%{http_code}\n' "${R[@]}" https://dianavoice.online/rtc/validate   # 401
docker logs livekit | grep nodeIP     # должен быть публичный IP NEW
```

Для настоящего звонка добавь `NEW dianavoice.online` в `/etc/hosts` на ноутбуке
и проверь с российского подключения.

## 8. Переключение

База маленькая; короткая заморозка проще, чем синхронизация двух живых копий.

1. OLD: `docker stop nextjs` (с этого момента сайт недоступен).
2. Повтори шаг 5 только для `voice.pgdump` и `uploads.tar`.
3. NEW: `docker stop nextjs`, затем
   `pg_restore --clean --if-exists --no-owner -U voice -d voice`, заново
   распакуй загрузки, `docker start nextjs`.
4. DNS в Beget: A-записи `dianavoice.online` **и** `www` → NEW.
   TTL 600 секунд, так что подожди ~10 минут.
5. Когда `dig +short dianavoice.online @1.1.1.1` показывает NEW, повтори шаг 7
   без `--resolve`.

## 9. После переключения

- Обнови IP в `DEPLOY.md` и `.github/workflows/deploy.yml` (`DEPLOY_HOST`).
- Скопируй строку `github-actions deploy` из `~/.ssh/authorized_keys` на OLD
  в тот же файл на NEW.
- Обнови секрет known-hosts и сделай push. Прогон деплоя и есть сквозная проверка:

  ```bash
  ssh-keyscan NEW 2>/dev/null | gh secret set DEPLOY_KNOWN_HOSTS
  ```

- Оставь OLD нетронутым на несколько дней для отката (вернуть DNS), потом удали.
