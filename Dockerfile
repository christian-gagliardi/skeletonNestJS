FROM node:16-alpine

RUN apk add --no-cache git make gcc g++ yarn

WORKDIR '/home/pha-bag'

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

ENTRYPOINT ["yarn", "start:prod"]
