# Медицинская платформа

Веб-приложение для управления медицинскими приемами, врачами и клиниками.

## Технологии

- Frontend:
  - React
  - TypeScript
  - Material-UI
  - React Router
  - Zustand
  - Vite

- Backend:
  - Node.js
  - Express
  - TypeScript
  - TypeORM
  - PostgreSQL
  - JWT Authentication

## Установка

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd medical-platform
```

2. Установите зависимости:
```bash
# Установка зависимостей для клиента
npm install

# Установка зависимостей для сервера
cd server
npm install
```

3. Создайте базу данных PostgreSQL:
```sql
CREATE DATABASE medical_platform;
```

4. Настройте переменные окружения:
- Скопируйте `.env.example` в `.env`
- Заполните необходимые переменные окружения

## Запуск

1. Запустите сервер:
```bash
cd server
npm run dev
```

2. В другом терминале запустите клиент:
```bash
npm run dev
```

Приложение будет доступно по адресу http://localhost:3000

## Функциональность

- Аутентификация пользователей (регистрация/вход)
- Управление приемами
- Просмотр и поиск врачей
- Просмотр и поиск клиник
- Обмен сообщениями
- Управление документами

## Структура проекта

```
medical-platform/
├── src/                    # Клиентский код
│   ├── components/        # React компоненты
│   ├── pages/            # Страницы приложения
│   ├── hooks/            # React хуки
│   ├── store/            # Zustand store
│   └── utils/            # Вспомогательные функции
├── server/                # Серверный код
│   ├── config/           # Конфигурация
│   ├── controllers/      # Контроллеры
│   ├── entities/         # TypeORM сущности
│   ├── middleware/       # Express middleware
│   ├── routes/           # Маршруты API
│   └── utils/            # Вспомогательные функции
└── package.json
``` 