FROM node:11-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN ls -l

# Expose port
EXPOSE 8087

CMD ["npm", "run", "production"]

#docker build --tag hbmm:v1 .
#docker image save -o C:\Users\salgan\Desktop\Docker_Images\hbmm.tar hbmm:v1
#docker run -it --rm -p 8087:8087  hbmm:v1