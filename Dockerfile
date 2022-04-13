FROM node:16-alpine

RUN apk add --no-cache git make gcc g++ yarn

WORKDIR '/admin-be'

COPY package.json /admin-be
COPY yarn.lock /admin-be

RUN yarn

COPY . ./admin-be

RUN yarn build

EXPOSE 3000

ENTRYPOINT ["yarn", "run", "dev"]