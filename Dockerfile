# syntax=docker/dockerfile:1

FROM golang:alpine

WORKDIR /app
COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY . .
RUN go build -o /xmas-hat-gen-backend

EXPOSE 8000

CMD [ "/xmas-hat-gen-backend" ]