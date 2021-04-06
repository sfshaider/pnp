 FROM node:12-alpine
 RUN apk add --no-cache python g++ make
 WORKDIR /pnpsampletask
 COPY . .
 RUN npm install
 EXPOSE 8888
 CMD ["node", "server/index.js"]