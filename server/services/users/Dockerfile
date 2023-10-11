FROM node:18.16.1

WORKDIR /var/www/service-user

COPY package*.json ./

RUN npm install 
RUN npm install -g nodemon 

COPY ./ ./

EXPOSE 3001

CMD ["nodemon", "app.js"]