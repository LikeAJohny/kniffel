# build stage
FROM node:lts as build-stage

ARG PUBLIC_SUPABASE_URL
ARG PUBLIC_SUPABASE_ANON_KEY

ENV PUBLIC_SUPABASE_URL=$PUBLIC_SUPABASE_URL
ENV PUBLIC_SUPABASE_ANON_KEY=$PUBLIC_SUPABASE_ANON_KEY

WORKDIR /app
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM node:lts as production-stage
WORKDIR /app
COPY --from=build-stage /app .
CMD ["node", "-r", "dotenv/config", "build"]
