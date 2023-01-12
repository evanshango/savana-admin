FROM node:16-alpine as build

WORKDIR /app
COPY ./package*.json .
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:stable-alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/savana-admin /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx","-g","daemon off;"]
