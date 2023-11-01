FROM node:20-alpine As builder
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories
RUN apk update && apk add sqlite
RUN apk add --no-cache --virtual .build-deps g++ gcc libgcc libstdc++ linux-headers make python3
WORKDIR /app
COPY package*.json .
COPY .npmrc .
RUN corepack enable
RUN pnpm install
COPY . .
RUN pnpm build && pnpm prune --prod

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/content/ ./content/
COPY --from=builder /app/dist/ ./dist/
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/.env ./
COPY --from=builder /app/package.json ./

EXPOSE 3030
CMD [ "node", "./dist/main.js" ]
