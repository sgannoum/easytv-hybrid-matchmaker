FROM node:11-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./
COPY api-docs api-docs
COPY config config
COPY lib lib
COPY REST_Full REST_Full
COPY test test
COPY node_modules node_modules

RUN ls -l

# Expose port
EXPOSE 8087

CMD ["npm", "run", "production"]

#docker run -it --rm -p 8087:8087  hbmm:v1