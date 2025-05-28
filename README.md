### Estrutura Completa do Projeto

Vamos organizar o projeto em dois diretórios principais:

```
url-shortener/
├── backend/
├── frontend/
├── docker-compose.yml
└── README.md
```

---

### 1. `docker-compose.yml`

```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: url_shortener
    ports:
      - '3306:3306'
    volumes:
      - mysql_data:/var/lib/mysql

  redis:
    image: redis:alpine
    ports:
      - '6379:6379'

  backend:
    build: ./backend
    ports:
      - '3001:3001'
    env_file:
      - ./backend/.env
    depends_on:
      - mysql
      - redis

  frontend:
    build: ./frontend
    ports:
      - '3000:3000'
    depends_on:
      - backend

volumes:
  mysql_data:
```

---

### 2. Backend NestJS (`/backend`)

```bash
nest new backend
cd backend
npm install @nestjs/config @nestjs/axios @nestjs/typeorm @nestjs/redis ioredis drizzle-orm mysql2
```

**`/backend/.env`**
```env
DATABASE_URL=mysql://root:root@mysql:3306/url_shortener
REDIS_URL=redis://redis:6379
URL_EXPIRATION_MINUTES=10
PORT=3001
```

#### Estrutura básica dos módulos:
- `url` (encurtamento, redirecionamento)
- `analytics` (métricas)

**Rotas principais:**
- `POST /url`
- `GET /:code`
- `GET /urls`
- `GET /report/daily`
- `GET /report/peak`

Testes com Jest:
```bash
npm install --save-dev jest @nestjs/testing ts-jest
```

Crie testes unitários e de integração para `POST /url`.

---

### 3. Frontend Next.js (`/frontend`)

```bash
npx create-next-app frontend --ts
cd frontend
npm install tailwindcss @headlessui/react @heroicons/react axios recharts
npx tailwindcss init -p
```

**`/frontend/pages/index.tsx`**:
- Formulário de nova URL
- Tabela com URLs (original, encurtada, expiração, acessos)
- Gráfico de barras

**`/frontend/tailwind.config.js`**:
```js
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

---

### 4. Comandos para Rodar

```bash
# Do diretório raiz
docker-compose up --build
```

Acesse:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

---