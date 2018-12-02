FROM node:latest
RUN mkdir /src
RUN npm install nodemon -g

COPY ./api /src
WORKDIR /src
RUN npm install
RUN node_modules/.bin/sequelize db:migrate --migrations-path '/src/db/migrations'
RUN node_modules/.bin/sequelize db:seed:all --seeders-path '/src/db/seeders'
EXPOSE 3000
CMD npm start
