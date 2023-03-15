FROM node:13.12.0-alpine
WORKDIR /container_3_userprofile_page
ENV PATH /container_3_userprofile_page/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
CMD ["npm", "start"]