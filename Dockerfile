FROM node:latest
WORKDIR /api
RUN npm install
EXPOSE 3000
ADD npm start
