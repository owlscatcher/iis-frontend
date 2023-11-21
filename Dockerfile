FROM node:18.18-alpine

WORKDIR /app

RUN apk add build-base python3
RUN npm install -g node-gyp

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]


