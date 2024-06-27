# build stage
FROM node:alpine as build-stage

ARG PUBLIC_SUPABASE_URL
ARG PUBLIC_SUPABASE_ANON_KEY

ENV PUBLIC_SUPABASE_URL=$PUBLIC_SUPABASE_URL
ENV PUBLIC_SUPABASE_ANON_KEY=$PUBLIC_SUPABASE_ANON_KEY

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# production stage
FROM node:alpine as production-stage

ARG ORIGIN
ENV ORIGIN=$ORIGIN

WORKDIR /app

COPY --from=build-stage /app/build ./build
COPY --from=build-stage /app/package.json ./package.json
COPY --from=build-stage /app/pnpm-lock.yaml ./pnpm-lock.yaml

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --production

CMD ["ORIGIN=$ORIGIN", "node", "-r", "dotenv/config", "build"]
