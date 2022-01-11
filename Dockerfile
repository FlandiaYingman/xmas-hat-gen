# syntax=docker/dockerfile:1

# Build
FROM golang:alpine AS build
WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY . .
RUN go build -o / ./...

# Deploy
FROM gcr.io/distroless/static-debian11 AS deploy
WORKDIR /

COPY --from=build /xmas-hat-gen /xmas-hat-gen

EXPOSE 8000
USER nonroot:nonroot
ENTRYPOINT ["/xmas-hat-gen"]