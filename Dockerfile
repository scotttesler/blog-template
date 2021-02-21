FROM node:15
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]
