FROM node:11-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN ls -l

RUN npm install --verbose

# Expose tomcat port
EXPOSE 8087

CMD ["npm", "run", "production"]

#docker run -it --rm -p 8087:8087  rbmm:v1