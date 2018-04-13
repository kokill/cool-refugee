FROM node:8
WORKDIR /app
COPY package.json /app
COPY server.js /app
RUN npm install express compression
COPY ./build /app/build
CMD npm run start:prod
EXPOSE 3000