FROM node:alpine as builder

WORKDIR usr/src/app
COPY package.json .
RUN npm install

RUN npm install http-proxy-middleware --save \
    npm install axios --save \
    npm install d3

COPY . .

EXPOSE 3000

CMD ["npm", "start"]