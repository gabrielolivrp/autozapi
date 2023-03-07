FROM node:alpine

FROM mcr.microsoft.com/playwright:v1.30.0-focal

WORKDIR /usr/autozapi

COPY package*.json ./

RUN npm install

RUN npx playwright install chromium \
    && npx playwright install-deps chromium

COPY . .

RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]
