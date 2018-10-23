FROM node:8.12.0-jessie

WORKDIR /usr/app

COPY . .
RUN npm install && npm install -g pm2

CMD [ "npm", "run", "dev" ]
