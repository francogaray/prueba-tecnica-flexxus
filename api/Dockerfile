FROM node:21

WORKDIR /myapi
COPY package.json .
RUN npm install

COPY . .
CMD npm start