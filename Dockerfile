FROM node:18.20.0
WORKDIR /usr/src/app
EXPOSE 4000
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "start:dev" ]
