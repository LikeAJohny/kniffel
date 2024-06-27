FROM node:alpine as build-stage

ARG ORIGIN
ARG PUBLIC_SUPABASE_URL
ARG PUBLIC_SUPABASE_ANON_KEY

ENV ORIGIN=$ORIGIN
ENV PUBLIC_SUPABASE_URL=$PUBLIC_SUPABASE_URL
ENV PUBLIC_SUPABASE_ANON_KEY=$PUBLIC_SUPABASE_ANON_KEY

WORKDIR /app

# create .env file
COPY .env.dist docker/create-env.sh ./
RUN chmod +x create-env.sh
RUN ./create-env.sh

# build app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# build for production
FROM node:alpine as production-stage

WORKDIR /app

COPY --from=build-stage /app/.env ./.env
COPY --from=build-stage /app/build ./build
COPY --from=build-stage /app/package.json ./package.json
COPY --from=build-stage /app/pnpm-lock.yaml ./pnpm-lock.yaml

RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile --production

CMD ["node", "-r", "dotenv/config", "build"]
