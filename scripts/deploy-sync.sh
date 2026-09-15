#!/usr/bin/env bash
# Mirror the working tree onto the deploy host.
#
# --delete: without it, files dropped from the repo linger on the server and
# break the build against current code.
# .env.production: server-only, and the exclude also shields it from --delete.
set -euo pipefail

host=${1:?usage: $0 <user@host>}

cd "$(dirname "$0")/.."

exec rsync -az --delete \
  --exclude=.git \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.env.production \
  ./ "$host:/opt/voice/"
