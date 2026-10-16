# Virtual Gallery: Express (server.js + TS-роуты через tsx) + React SPA (Vite) + виджеты
FROM node:22-bookworm-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
COPY src/frontend/package.json src/frontend/package-lock.json src/frontend/
RUN npm --prefix src/frontend ci

COPY . .
# Tailwind + виджеты (dist/frontend) и React SPA (src/frontend/dist)
RUN npm run build && npm --prefix src/frontend run build
# В рантайме нужны только prod-зависимости (tsx лежит в dependencies)
RUN npm prune --omit=dev


FROM node:22-bookworm-slim
ENV NODE_ENV=production \
    PORT=5000
WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json /app/server.js ./
COPY --from=build /app/src ./src
COPY --from=build /app/public ./public
COPY --from=build /app/dist ./dist
# Статика SPA не должна тянуть dev-зависимости фронтенда
RUN rm -rf src/frontend/node_modules

# Загрузки пишутся в public/uploads — монтируется томом (см. docker-compose.prod.yml)
RUN mkdir -p /app/public/uploads && chown -R node:node /app/public/uploads
USER node

EXPOSE 5000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "--import", "tsx", "server.js"]
