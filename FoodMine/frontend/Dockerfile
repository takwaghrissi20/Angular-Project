# Etape 1 : builder Angular
FROM  node:22.18.0-alpine as node
WORKDIR /usr/src/app

#Copy les dependences des projets
COPY package*.json ./

#install des dependences
RUN npm install --force

#copy le reste de projet
COPY  . .

#Build de l'application Angular
EXPOSE 4200

CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "4200"]




























