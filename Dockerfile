# syntax=docker/dockerfile:1

# Build
FROM golang:bullseye AS build
WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY . .
RUN go build -o / ./...

# Deploy
FROM gcr.io/distroless/base-debian11 AS deploy
WORKDIR /

COPY --from=build /xmas-hat-gen /xmas-hat-gen
COPY --from=build /app/assets /assets

EXPOSE 8000
ENTRYPOINT ["/xmas-hat-gen"]