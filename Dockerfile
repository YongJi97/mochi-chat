FROM node:16.20
WORKDIR /mochi-chat
COPY ./package*.json /mochi-chat
COPY .firebaserc /mochi-chat
COPY ./firebase.json /mochi-chat
RUN npm install
COPY . .
CMD ["npm","start"]

