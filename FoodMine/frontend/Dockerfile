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
RUN npm run build:prod

CMD ["npm", "start"]


# Etape 2: Nginx pour servir l'application 
#FROM nginx:alpine

#copier les fichiers buildés vers nginx
#COPY --from=node  /usr/src/app/dist/frontend /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/conf.d/default.conf

#exposer le port 80
#EXPOSE 80
#CMD ["nginx" ,"-g","daemon off;"]