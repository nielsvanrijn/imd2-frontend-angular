#stage 1
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm config set "@fortawesome:registry" https://npm.fontawesome.com/
ARG FONTAWESOME_AUTH_TOKEN
RUN npm config set "//npm.fontawesome.com/:_authToken" ${FONTAWESOME_AUTH_TOKEN}
RUN npm install

ARG PRODUCTION ${PRODUCTION}
ENV PRODUCTION ${PRODUCTION}
ARG APIURL ${APIURL}
ENV APIURL ${APIURL}
ARG UPLOADAPIURL ${UPLOADAPIURL}
ENV UPLOADAPIURL ${UPLOADAPIURL}
ARG UPLOADUSERNAME ${UPLOADUSERNAME}
ENV UPLOADUSERNAME ${UPLOADUSERNAME}
ARG UPLOADAPIPASS ${UPLOADAPIPASS}
ENV UPLOADAPIPASS ${UPLOADAPIPASS}

RUN npm run build:prod --prod

#stage 2
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist/frontend-angular /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]