FROM --platform=linux/amd64 node:18
WORKDIR /usr/src/app
ENV PORT 3000
COPY . .
RUN npm cache clean --force
RUN npm install --loglevel verbose
EXPOSE ${PORT}
CMD ["npm", "start"]