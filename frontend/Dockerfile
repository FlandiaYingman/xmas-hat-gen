# syntax=docker/dockerfile:1

FROM node:17-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production

COPY . .
CMD ["npm", "start"]
