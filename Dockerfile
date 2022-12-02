# Install dependencies only when needed
FROM node:16-alpine AS deps

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --omit=dev


FROM node:16-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

EXPOSE 3000

CMD yarn preview --port 3000 --host

