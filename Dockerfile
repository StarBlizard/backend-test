FROM node:latest
RUN mkdir /src
RUN npm install nodemon -g

COPY ./api /src
WORKDIR /src
RUN npm install
EXPOSE 3000
CMD npm start
