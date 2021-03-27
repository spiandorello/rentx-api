FROM node

WORKDIR /usr/app

COPY package.json .

RUN npm install

COPY . ./

CMD ["npm", "run", "dev:server"]

EXPOSE 3000
