# base image
FROM node:6.9.2

# set working directory
RUN mkdir /usr/src/app
#VOLUME ["/server"]
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install

EXPOSE 1337
