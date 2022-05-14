FROM node:latest
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm install
RUN npm i --save moment
RUN npm install bcryptjs --save
RUN npm install bcrypt -g
RUN npm install bcrypt --save
CMD npm start
EXPOSE 443
