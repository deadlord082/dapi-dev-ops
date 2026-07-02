# frontend multi-stage Dockerfile
FROM node:22.14.0-alpine AS builder
WORKDIR /app
ARG VITE_API_BASE_URL=/api
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV CI=true
COPY package*.json ./
RUN npm install
COPY index.html ./
COPY public ./public
COPY src ./src
COPY vite.config.js ./
RUN npm run build

FROM nginx:1.27.3-alpine AS runtime
RUN apk update && apk upgrade && apk add --no-cache curl \
    && mkdir -p /tmp/nginx /var/cache/nginx /var/run /var/log/nginx \
    && addgroup -S app && adduser -S app -G app
COPY --from=builder /app/dist /usr/share/nginx/html
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
RUN chown -R app:app /usr/share/nginx/html /tmp/nginx /var/cache/nginx /var/run /var/log/nginx /etc/nginx/conf.d /etc/nginx/nginx.conf
USER app
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=10s --retries=5 CMD curl -f http://127.0.0.1:8080/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
