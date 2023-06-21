# build stage
FROM node:lts as build-stage
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
