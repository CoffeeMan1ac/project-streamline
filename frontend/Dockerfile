# Build stage
FROM mirror.gcr.io/library/node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG BUILD_MODE=prod
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build:${BUILD_MODE}

# Serve stage
FROM mirror.gcr.io/library/nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Cloud Run
COPY nginx.conf /etc/nginx/templates/default.conf.template

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]