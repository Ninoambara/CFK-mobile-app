FROM node:18.16.1

WORKDIR /var/www/service-app

COPY package*.json ./

ENV NODE_ENV=production

RUN npm install 
RUN npm install -g nodemon 

COPY ./ ./

EXPOSE 3000

CMD ["npm", "start"]