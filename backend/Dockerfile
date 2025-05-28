FROM node:20-alpine AS builder

WORKDIR /app

COPY backend/package*.json ./
RUN npm install

COPY backend/ ./

# Copia arquivos adicionais necessários
COPY backend/drizzle.config.ts ./drizzle.config.ts
COPY backend/tsconfig.json ./tsconfig.json
COPY backend/start.sh ./start.sh

# Dá permissão de execução ao script (alternativa ao chmod local)
RUN chmod +x ./start.sh

CMD ["sh", "./start.sh"]

