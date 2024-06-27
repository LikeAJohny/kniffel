FROM node:alpine as build-stage

ARG PUBLIC_SUPABASE_URL
ARG PUBLIC_SUPABASE_ANON_KEY

ENV PUBLIC_SUPABASE_URL=$PUBLIC_SUPABASE_URL
ENV PUBLIC_SUPABASE_ANON_KEY=$PUBLIC_SUPABASE_ANON_KEY

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# build for production
FROM node:alpine as production-stage

ARG ORIGIN
ARG PUBLIC_SUPABASE_URL
ARG PUBLIC_SUPABASE_ANON_KEY

ENV ORIGIN=$ORIGIN
ENV PUBLIC_SUPABASE_URL=$PUBLIC_SUPABASE_URL
ENV PUBLIC_SUPABASE_ANON_KEY=$PUBLIC_SUPABASE_ANON_KEY

WORKDIR /app

COPY --from=build-stage /app/build ./build
COPY --from=build-stage /app/package.json ./package.json
COPY --from=build-stage /app/pnpm-lock.yaml ./pnpm-lock.yaml

RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile --production

COPY .env.dist docker/prod-entrypoint.sh ./
RUN chmod +x prod-entrypoint.sh

ENTRYPOINT ["./prod-entrypoint.sh"]
CMD ["node", "-r", "dotenv/config", "build"]
