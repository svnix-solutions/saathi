#!/bin/zsh
# Loads schema.sql and the seed files into a throwaway PostgreSQL 16 server, runs test_schema.sql, then deletes it all.
# Run: ./test_schema.sh
set -e
cd "$(dirname "$0")"
P=/opt/homebrew/opt/postgresql@16/bin
T=$(mktemp -d)
trap '$P/pg_ctl -D $T -m fast stop >/dev/null 2>&1; rm -rf $T' EXIT
$P/initdb -D $T -A trust -U kk >/dev/null
$P/pg_ctl -D $T -o "-p 54339 -c listen_addresses=127.0.0.1 -c unix_socket_directories=''" -l $T/log -w start >/dev/null
$P/createdb -h 127.0.0.1 -p 54339 -U kk saathi
for f in schema.sql seed_pricing.sql seed_professions.sql test_schema.sql; do
  $P/psql -h 127.0.0.1 -p 54339 -U kk -d saathi -v ON_ERROR_STOP=1 -q -f $f
done
