FROM node:12

WORKDIR /microservice

COPY package.json .

RUN npm install

COPY . .

CMD npm run dev