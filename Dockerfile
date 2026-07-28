# syntax=docker/dockerfile:1

FROM node:22-alpine

# Entorno de produccion por defecto dentro del contenedor
ENV NODE_ENV=production

WORKDIR /app

# Copiamos solo los manifests primero para aprovechar la cache de capas:
# npm ci solo se re-ejecuta si package.json / package-lock.json cambian.
COPY package*.json ./
RUN npm ci --omit=dev

# Copiamos el resto del codigo
COPY . .

# El puerto es informativo; el real lo define la variable PORT en runtime
EXPOSE 3000

# No corras como root
USER node

CMD ["npm", "start"]
