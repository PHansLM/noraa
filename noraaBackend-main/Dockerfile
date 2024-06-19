# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias del backend
RUN npm install

# Copia el resto de los archivos del backend al contenedor
COPY . .

# Expone el puerto que utiliza tu backend
EXPOSE 5000

# Comando para ejecutar tu aplicación
CMD ["node", "server.js"]
