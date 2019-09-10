FROM node:11-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN ls -l

RUN npm install --verbose

CMD ["npm", "run", "production"]
