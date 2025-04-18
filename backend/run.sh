#!/bin/sh

# rc-service postgresql start

postgraphile -c postgres://stelmastro:nebulaensorcxo@localhost:5432/kosmaarkivo --watch --cors --enhance-graphiql --append-plugins postgraphile-plugin-connection-filter
