FROM node:20

WORKDIR /root/api-getway

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8080

CMD ["yarn","start:prod"]

# docker build . -t api-gateway

# docker run -d -p 8080:8080 --name api-gateway api-getway

# docker run -d --name product-service --net node-network product-service