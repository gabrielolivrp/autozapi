FROM node:alpine

FROM mcr.microsoft.com/playwright:v1.28.1-focal

WORKDIR /usr/autozapi

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]
