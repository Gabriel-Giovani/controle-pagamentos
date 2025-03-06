#!/bin/bash

sleep 30s

/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "Port@l.fund2" -Q "CREATE DATABASE controle-pagamentos"

sleep 5s