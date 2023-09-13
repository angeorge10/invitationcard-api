FROM node:18-slim
RUN mkdir app
COPY . ./app
WORKDIR ./app
RUN npm install
EXPOSE 3000
CMD node app.js
