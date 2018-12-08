FROM node:10

# Create app directory
RUN mkdir -p /usr/app/src
WORKDIR /usr/app

# Install app dependencies
COPY package.json /usr/app/
RUN apt-get update && apt-get install -y git
RUN npm install

# Bundle app source
COPY src /usr/app/src
COPY .env /usr/app/
COPY .env.example /usr/app/

EXPOSE 3000
CMD [ "npm", "start" ]
