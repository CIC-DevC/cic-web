FROM node:lts-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm update

COPY . .
RUN npm run build:prod

EXPOSE 6868
CMD [ "node", "server.js" ]
