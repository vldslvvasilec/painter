# Используем официальный образ Node.js
FROM node:20-alpine

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем весь проект
COPY . .

# Билдим приложение
RUN npm run build

# Устанавливаем переменную среды
ENV NODE_ENV=production

# Запускаем приложение
CMD ["npm", "start"]
