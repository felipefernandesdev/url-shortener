#!/bin/sh

echo "⏳ Aguardando o MySQL subir..."
until nc -z -v -w30 mysql 3306
do
  echo "⏳ Aguardando o MySQL..."
  sleep 2
done

echo "🚀 Executando drizzle push..."
npx drizzle-kit push:mysql --config=drizzle.config.ts

echo "🚀 Iniciando o NestJS..."
npm run start:dev
