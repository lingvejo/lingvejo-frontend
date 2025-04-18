#!/bin/sh

set -e

# Install dependencies
apk add --no-cache postgresql16 postgresql16-client

# Initialize PostgreSQL
su postgres -c "initdb -D /var/lib/postgresql/16/data"

# Start PostgreSQL service
rc-service postgresql start

# Wait a moment to ensure it's running
sleep 2

# Create user and database
psql -U postgres <<EOF
CREATE USER stelmastro WITH PASSWORD 'nebulaensorcxo';
ALTER USER stelmastro WITH SUPERUSER;
CREATE DATABASE kosmaarkivo OWNER stelmastro;
EOF

npm install -g postgraphile
npm install -g postgraphile-plugin-connection-filter