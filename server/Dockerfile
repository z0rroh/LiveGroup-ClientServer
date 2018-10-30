# base image
FROM node:6.9.2

# set working directory
RUN mkdir /app

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app

RUN npm install --silent

EXPOSE 1337
