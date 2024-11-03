FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g prisma
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]