FROM node:23-alpine3.21 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:23-alpine3.21 AS production
WORKDIR /usr/src/app
COPY package*.json ./
COPY --from=build /usr/src/app/dist ./dist
RUN npm install --only=production
EXPOSE 3000
ENV PORT=3000
CMD ["node", "dist/index.js"]