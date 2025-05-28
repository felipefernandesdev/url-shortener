# Use uma imagem base do Node
FROM node:22-alpine

# Diretório de trabalho no container
WORKDIR /app

# Copia os arquivos necessários
COPY frontend/package*.json ./

# Instala dependências
RUN npm install

# Copia todo o frontend
COPY frontend/ .

# Exposta a porta 3000
EXPOSE 3000

# Comando para rodar o servidor
CMD ["npm", "run", "dev"]