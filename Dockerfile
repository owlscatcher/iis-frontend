FROM node:18.18-alpine

WORKDIR /app

RUN apk add build-base python3
RUN npm install -g node-gyp serve

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD serve -s build -l 3001


