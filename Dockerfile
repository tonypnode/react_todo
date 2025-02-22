FROM node:12.2.0-alpine

WORKDIR /app

ENV PATH /app/nodes_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY . /app

CMD ["npm", "start"]

