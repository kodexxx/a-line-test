FROM node:12.1.0-alpine
ENV PORT=80
EXPOSE 80
WORKDIR /root/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . ./

CMD ["yarn", "start"]
