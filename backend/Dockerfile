# ── Stage: produção ──────────────────────────────────────────────────────────
FROM node:18-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar manifesto de dependências primeiro (cache de layers)
COPY package*.json ./

# Instalar apenas dependências de produção
RUN npm install --omit=dev

# Copiar código fonte
COPY src/ ./src/

# Usuário não-root (segurança)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expor porta
EXPOSE 3001

# Healthcheck interno
HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3001/health || exit 1

CMD ["node", "src/index.js"]
