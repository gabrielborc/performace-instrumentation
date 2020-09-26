FROM node:alpine

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY ./src/01-scalability/01 .

CMD ["node", "index.js"]