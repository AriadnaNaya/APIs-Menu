# APIs/backend/Dockerfile
FROM node:18-alpine
WORKDIR /app

# Copia package.json y package-lock.json si exists
COPY package.json ./

# Instala dependencias
RUN npm install

# Copia el resto de tu backend
COPY . .

EXPOSE 5000
CMD ["npm", "start"]
