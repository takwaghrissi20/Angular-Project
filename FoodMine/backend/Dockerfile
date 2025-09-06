FROM  node:22.18.0-alpine as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 5000

CMD ["npx", "ts-node", "src/server.ts"] 
#to run ts directly
