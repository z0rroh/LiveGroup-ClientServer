# base image
FROM node:latest

# set working directory
RUN mkdir /app

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app

RUN npm install --silent

EXPOSE 3000
