#!/bin/sh

set -e

echo "⏳ Aguardando o MySQL subir..."
until nc -z -v -w30 mysql 3306
do
  echo "⏳ Aguardando o MySQL..."
  sleep 2
done

echo "🚀 Gerando migrations..."
npx drizzle-kit generate

echo "🚀 Aplicando migrations..."
npx drizzle-kit migrate

echo "🚀 Iniciando o NestJS..."
npm run start:dev