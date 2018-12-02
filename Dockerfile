FROM ubuntu:latest
FROM node:latest

COPY . /api
RUN npm install
RUN node_modules/.bin/sequelize db:migrate --migrations-path ./db/migrations
RUN node_modules/.bin/sequelize db:seeds:all --seeders-path ./db/seeders
EXPOSE 3000
CMD npm start
