FROM node:10-alpine

# Create app directory
WORKDIR /usr/src/app


COPY . .

RUN yarn install --production \
  && yarn cache clean

EXPOSE 8080
CMD [ "node", "production.js" ]