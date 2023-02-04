FROM node:14.16-alpine

ENV NODE_ENV=production
WORKDIR "/akagi"

RUN yarn global add typescript

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 5000

CMD [ "yarn", "start" ]