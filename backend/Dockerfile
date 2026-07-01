# backend multi-stage Dockerfile
FROM node:22.12.0-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --production

FROM node:22.12.0-alpine AS runtime
WORKDIR /app
RUN addgroup -S app && adduser -S app -G app
COPY --from=deps /app/node_modules ./node_modules
COPY . ./
RUN apk add --no-cache curl
USER app
EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=10s --retries=5 CMD curl -f http://127.0.0.1:3001/ || exit 1
CMD ["node", "server.js"]
