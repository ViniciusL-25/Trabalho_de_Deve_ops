# 🍔 QuickBite — Sistema de Pedidos Online

Sistema de pedidos Full Stack com React, Node.js, Express e PostgreSQL, containerizado com Docker e com pipeline CI/CD via GitHub Actions.

---

## 🏗️ Arquitetura

```
Frontend (React)  →  Backend (Node.js + Express)  →  PostgreSQL
     :3000                    :3001                   (interno)
```

---

## 🚀 Como executar

### Pré-requisitos
- Docker e Docker Compose instalados

### 1. Clone o repositório
```bash
git clone https://github.com/ViniciusL-25/Trabalho_de_Deve_ops.git
cd quickbite
```

### 2. Configure as variáveis de ambiente
```bash
cp .env.example .env
# Edite o .env com suas credenciais
```

### 3. Suba os containers
```bash
docker compose up --build
```

### 4. Acesse
| Serviço  | URL                          |
|----------|------------------------------|
| Frontend | http://localhost:3000        |
| Backend  | http://localhost:3001/health |
| API      | http://localhost:3001/api/pedidos |

---

## 🧪 Como testar

```bash
cd backend
npm install
npm test
```

---

## 🐳 Comandos Docker úteis

```bash
# Subir tudo
docker compose up --build

# Subir em background
docker compose up -d --build

# Ver logs
docker compose logs -f backend

# Parar tudo
docker compose down

# Parar e remover volumes (⚠️ apaga dados do banco)
docker compose down -v

# Ver containers rodando
docker ps
```

---

## 🔄 Pipeline CI/CD

O pipeline roda automaticamente em todo push para `main`:

1. **Testes** — executa `npm test` no backend
2. **Build** — constrói imagens Docker
3. **Publish** — publica no Docker Hub (apenas em push para `main`)

Para habilitar o passo de publicação, configure os secrets no GitHub:
- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`

---

## 🐛 Correções realizadas

| # | Problema | Causa | Solução aplicada |
|---|----------|-------|-----------------|
| 1 | Backend não conectava ao banco | `DB_HOST=localhost` dentro do container | Alterado para `DB_HOST=db` (nome do serviço Docker) |
| 2 | Containers subiam fora de ordem | Sem `depends_on` e `healthcheck` | Adicionado `depends_on: db: condition: service_healthy` |
| 3 | Banco perdia dados ao reiniciar | Sem volume persistente | Criado volume `postgres_data` |
| 4 | Frontend não acessava a API | URL hardcoded como `localhost` | Variável `REACT_APP_API_URL` via `ARG` no Dockerfile |
| 5 | Senhas expostas no código | Credenciais hardcoded | Movido para `.env` com `.gitignore` + GitHub Secrets |
| 6 | Build quebrava em produção | Dependências de dev no stage de produção | `npm install --omit=dev` no Dockerfile do backend |

---

## 🔐 Segurança

- Credenciais em `.env` (ignorado pelo git)
- Secrets sensíveis no GitHub Actions Secrets
- Container backend roda com usuário não-root
- `.env.example` no repositório como referência (sem valores reais)

---

## 📁 Estrutura do projeto

```
project/
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── index.js
│       └── App.js
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
│   │   ├── index.js
│   │   ├── app.js
│   │   ├── db.js
│   │   └── routes/
│   │       └── pedidos.js
│   └── tests/
│       └── api.test.js
├── database/
│   └── init.sql
├── docker-compose.yml
├── .env.example
├── .gitignore
├── .github/
│   └── workflows/
│       └── ci.yml
└── README.md
```
