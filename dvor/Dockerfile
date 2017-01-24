FROM registry.gl.sdvor.com/devops/nodejs-docker

ENV NODE_ENV development
ENV API_URL_SDVOR https://www.sdvor-dev.com/api/v1
ENV API_URL_CATALOG https://catalog-api-dev.sdvor.com

WORKDIR /app
ADD . /app
RUN npm install
RUN npm run build

EXPOSE 3003

CMD []
ENTRYPOINT ["npm", "start"]