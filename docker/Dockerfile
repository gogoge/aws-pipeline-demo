From node:6.9.5
COPY build /server/build
COPY index.html /server
COPY server.js /server/server.js
COPY config.js /server
COPY path.js /server
COPY node_modules /server/node_modules
WORKDIR /server
EXPOSE 3000
ENTRYPOINT  ["node", "server.js"]

