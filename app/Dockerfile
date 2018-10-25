FROM node:8.12.0-jessie

WORKDIR /usr/app

COPY . .
RUN npm install && npm install -g pm2

CMD ["pm2-runtime", "ecosystem.config.js"]
