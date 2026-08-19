# Deploying dianavoice.online

Host: `root@195.72.61.232`, app dir `/opt/voice`.

## Topology

```
:80 :443  ─►  caddy (host network)
                ├─ www.dianavoice.online ── 301 ─► apex
                └─ dianavoice.online
                     ├─ /rtc*, /twirp/*  ─► 127.0.0.1:7880   LiveKit signalling + API
                     └─ everything else  ─► 127.0.0.1:3000   Next.js + socket.io

:7881/tcp         ─►  livekit (host network)   ICE/TCP fallback
:50000-50100/udp  ─►  livekit (host network)   RTP media

private bridge:
  nextjs  127.0.0.1:3000  ─► db:5432
  db      127.0.0.1:5432  (SSH tunnel target)
```

## Deploy

```bash
# Code (never node_modules)
tar cf - --exclude=node_modules --exclude=.git --exclude=.next . \
  | ssh root@195.72.61.232 'mkdir -p /opt/voice && tar xf - -C /opt/voice'

# Secrets: server only, never committed
ssh root@195.72.61.232
cd /opt/voice
cp .env.production.example .env.production && chmod 600 .env.production
$EDITOR .env.production

# First run: staging CA (production issues only 5 duplicate certs per week)
export ACME_CA=https://acme-staging-v02.api.letsencrypt.org/directory
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build

# Once verified, switch to real certs
unset ACME_CA
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --force-recreate caddy
```

`--env-file` feeds `${VAR}` interpolation in the compose file; `env_file:`
injects variables into the container. Both are required: without `--env-file`
the build args come out empty with only a warning.

## Verify

```bash
curl -I  http://dianavoice.online        # 308 -> https
curl -kI https://dianavoice.online       # 200
curl -kI https://www.dianavoice.online   # 301 -> apex
curl -k 'https://dianavoice.online/socket.io/?EIO=4&transport=polling'   # returns a sid
curl -k  https://dianavoice.online/rtc/validate   # 401 = LiveKit answered, routing OK

echo | openssl s_client -connect dianavoice.online:443 -servername dianavoice.online 2>/dev/null \
  | openssl x509 -noout -issuer           # staging certs say "(STAGING)"
```

## Firewall (applied on the box)

| Port | State |
|---|---|
| 22/tcp | open, rate-limited |
| 80/tcp, 443/tcp, 443/udp | open (Caddy, HTTP/3) |
| 7881/tcp | open (LiveKit ICE/TCP, cannot be proxied) |
| 50000-50100/udp | open (RTP media, cannot be proxied) |
| 7880, 3000, 5432, 8080 | closed (loopback-only or unpublished) |

## Database access

Open an SSH tunnel and use any client:

```bash
ssh -L 15432:127.0.0.1:5432 root@195.72.61.232
psql "postgres://voice:<POSTGRES_PASSWORD>@127.0.0.1:15432/voice"
```

One-offs: `ssh root@195.72.61.232 'docker exec -it postgres psql -U voice -d voice'`

## Automatic deploy (GitHub Actions)

`.github/workflows/deploy.yml` ships the tree over SSH, rebuilds, and
smoke-tests the public endpoints on every push to `main`.

One-time setup via developer machine, before first Actions run:

```bash
ssh-keygen -t ed25519 -f deploy_key -N '' -C 'github-actions deploy'
ssh root@195.72.61.232 'cat >> ~/.ssh/authorized_keys' < deploy_key.pub
gh secret set DEPLOY_SSH_KEY < deploy_key
ssh-keyscan 195.72.61.232 2>/dev/null | gh secret set DEPLOY_KNOWN_HOSTS
rm deploy_key deploy_key.pub
```

---

# Развёртывание dianavoice.online

Хост: `root@195.72.61.232`, каталог приложения `/opt/voice`.

## Топология

```
:80 :443  ─►  caddy (host network)
                ├─ www.dianavoice.online ── 301 ─► apex
                └─ dianavoice.online
                     ├─ /rtc*, /twirp/*  ─► 127.0.0.1:7880   сигналинг + API LiveKit
                     └─ всё остальное    ─► 127.0.0.1:3000   Next.js + socket.io

:7881/tcp         ─►  livekit (host network)   ICE/TCP fallback
:50000-50100/udp  ─►  livekit (host network)   RTP-медиа

приватный bridge:
  nextjs  127.0.0.1:3000  ─► db:5432
  db      127.0.0.1:5432  (цель для SSH-туннеля)
```

## Деплой

```bash
# Код (node_modules не копируем)
tar cf - --exclude=node_modules --exclude=.git --exclude=.next . \
  | ssh root@195.72.61.232 'mkdir -p /opt/voice && tar xf - -C /opt/voice'

# Секреты: только на сервере, в git не попадают
ssh root@195.72.61.232
cd /opt/voice
cp .env.production.example .env.production && chmod 600 .env.production
$EDITOR .env.production

# Первый запуск: staging CA (production выдаёт только 5 одинаковых сертификатов в неделю)
export ACME_CA=https://acme-staging-v02.api.letsencrypt.org/directory
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build

# После проверки переключаемся на настоящие сертификаты
unset ACME_CA
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --force-recreate caddy
```

`--env-file` подставляет `${VAR}` в самом compose-файле; `env_file:` передаёт
переменные внутрь контейнера. Нужны оба: без `--env-file` build-аргументы
окажутся пустыми, а вместо ошибки будет только предупреждение.

## Проверка

```bash
curl -I  http://dianavoice.online        # 308 -> https
curl -kI https://dianavoice.online       # 200
curl -kI https://www.dianavoice.online   # 301 -> apex
curl -k 'https://dianavoice.online/socket.io/?EIO=4&transport=polling'   # возвращает sid
curl -k  https://dianavoice.online/rtc/validate   # 401 = LiveKit ответил, маршрутизация работает

echo | openssl s_client -connect dianavoice.online:443 -servername dianavoice.online 2>/dev/null \
  | openssl x509 -noout -issuer           # у staging-сертификатов в issuer стоит "(STAGING)"
```

## Файрвол (уже настроен на сервере)

| Порт | Состояние |
|---|---|
| 22/tcp | открыт, с rate-limit |
| 80/tcp, 443/tcp, 443/udp | открыты (Caddy, HTTP/3) |
| 7881/tcp | открыт (LiveKit ICE/TCP, через прокси не работает) |
| 50000-50100/udp | открыты (RTP-медиа, через прокси не работает) |
| 7880, 3000, 5432, 8080 | закрыты (только loopback или не опубликованы) |

## Доступ к базе данных

Откройте SSH-туннель и подключайтесь любым клиентом:

```bash
ssh -L 15432:127.0.0.1:5432 root@195.72.61.232
psql "postgres://voice:<POSTGRES_PASSWORD>@127.0.0.1:15432/voice"
```

Разовые запросы: `ssh root@195.72.61.232 'docker exec -it postgres psql -U voice -d voice'`

## Автодеплой (GitHub Actions)

`.github/workflows/deploy.yml` при каждом пуше в `main` копирует код по SSH,
пересобирает контейнеры и проверяет публичные эндпоинты.

Разовая настройка с машины разработчика, до первого запуска Actions:

```bash
ssh-keygen -t ed25519 -f deploy_key -N '' -C 'github-actions deploy'
ssh root@195.72.61.232 'cat >> ~/.ssh/authorized_keys' < deploy_key.pub
gh secret set DEPLOY_SSH_KEY < deploy_key
ssh-keyscan 195.72.61.232 2>/dev/null | gh secret set DEPLOY_KNOWN_HOSTS
rm deploy_key deploy_key.pub
```
