FROM node
RUN apt-get update && apt-get install -y imagemagick
RUN npm i -g pm2 gulp bower
