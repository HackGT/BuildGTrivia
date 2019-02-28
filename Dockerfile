FROM node:10-alpine
MAINTAINER Ehsan Asdar <easdar@gatech.edu>

# Bundle app source
WORKDIR /usr/src/trivia
COPY . /usr/src/trivia
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
