FROM node:alpine

FROM mcr.microsoft.com/playwright:v1.28.1-focal

WORKDIR /opt/application/autozapi

COPY package*.json ./

CMD npm install

CMD npm run build && npm run start

EXPOSE 3000
