FROM node:22.17-alpine
WORKDIR /backend
RUN chown 1000:1000 -R /backend
RUN npm i -g fastify-cli
USER 1000:1000
EXPOSE 3000
CMD [ "npm","start" ]
