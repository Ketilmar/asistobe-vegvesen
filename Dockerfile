FROM node:16.16.0 as build

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json


RUN npm install
COPY . .

CMD node temporary.js
