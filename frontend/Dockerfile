# syntax=docker/dockerfile:1

# Build
FROM node:17-alpine AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Deploy
FROM alpine AS  deploy

WORKDIR /app

COPY --from=build /app/build/ /app
RUN apk add thttpd

EXPOSE 3000

CMD ["thttpd", "-p", "3000", "-D", "-l", "-"]
