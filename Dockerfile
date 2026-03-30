FROM node:20-slim

WORKDIR /server
COPY package.json .
RUN npm install --production
COPY . .
CMD ["node", "server.js"]