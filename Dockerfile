#stage 1
FROM node:lts-alpine as build-stage
WORKDIR /app
# ADD nginx.conf.sigil ./
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

RUN npm run build:prod

#stage 2
FROM kyma/docker-nginx as production-stage
# COPY --from=build-stage /app/nginx.conf.sigil ./
COPY --from=build-stage /app/dist/frontend-angular /var/www
# EXPOSE 80
CMD 'nginx'
# CMD ["nginx", "-g", "daemon off;"]