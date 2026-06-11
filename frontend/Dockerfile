# ── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:18-alpine AS build

WORKDIR /app

# Copiar manifesto primeiro (cache)
COPY package*.json ./
RUN npm install

# Receber URL da API como argumento de build
ARG REACT_APP_API_URL=http://localhost:3001
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Copiar código e buildar
COPY . .
RUN npm run build

# ── Stage 2: Servir com Nginx 
FROM nginx:1.25-alpine

# Copiar build para nginx
COPY --from=build /app/build /usr/share/nginx/html

# Configuração do nginx para React Router (SPA)
RUN echo 'server { \
  listen 80; \
  location / { \
    root /usr/share/nginx/html; \
    index index.html; \
    try_files $uri $uri/ /index.html; \
  } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
