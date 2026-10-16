# Virtual Gallery: Express (TypeScript) + React (Vite) в одном образе
FROM node:22-bookworm-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
COPY src/frontend/package.json src/frontend/package-lock.json src/frontend/
RUN npm --prefix src/frontend ci

COPY tsconfig.json ./
COPY src ./src
# tsc (бэкенд → dist) + vite build (фронтенд → src/frontend/dist)
RUN npm run build
RUN npm prune --omit=dev


FROM node:22-bookworm-slim
ENV NODE_ENV=production \
    PORT=5000
WORKDIR /app

COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/src/frontend/dist ./public

# Временная папка загрузок (файлы затем уходят в S3)
RUN mkdir -p /app/tmp && chown node:node /app/tmp
USER node

EXPOSE 5000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "dist/server.js"]
