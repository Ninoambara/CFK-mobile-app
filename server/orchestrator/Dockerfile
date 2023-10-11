FROM node:18.16.1

WORKDIR /var/www/orchestrator

COPY package*.json ./

RUN npm install 
RUN npm install -g nodemon 

COPY ./ ./

EXPOSE 4000

CMD ["nodemon", "app.js"]