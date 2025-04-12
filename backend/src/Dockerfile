FROM node:22.14.0-alpine
WORKDIR /app
COPY package.json server.js ./
RUN npm install
COPY . .
CMD ["node", "server.js"]
