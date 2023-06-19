FROM node:latest
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY --chown=node:node . .
EXPOSE 3005
CMD ["npm", "start"]
