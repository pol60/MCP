# API Документация

## Аутентификация

### Регистрация
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+79001234567"
}
```

### Вход
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Выход
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

## Пользователи

### Получение профиля
```http
GET /api/users/profile
Authorization: Bearer <token>
```

### Обновление профиля
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+79001234567"
}
```

## Доктора

### Получение списка докторов
```http
GET /api/doctors
Query Parameters:
  - page: number
  - limit: number
  - specialization: string
  - search: string
```

### Получение доктора по ID
```http
GET /api/doctors/:id
```

### Создание записи к доктору
```http
POST /api/doctors/:id/appointments
Authorization: Bearer <token>
Content-Type: application/json

{
  "date": "2024-03-20T10:00:00Z",
  "reason": "Консультация"
}
```

## Клиники

### Получение списка клиник
```http
GET /api/clinics
Query Parameters:
  - page: number
  - limit: number
  - search: string
```

### Получение клиники по ID
```http
GET /api/clinics/:id
```

## Записи на прием

### Получение списка записей
```http
GET /api/appointments
Authorization: Bearer <token>
Query Parameters:
  - page: number
  - limit: number
  - status: string
```

### Отмена записи
```http
DELETE /api/appointments/:id
Authorization: Bearer <token>
```

## Сообщения

### Получение списка сообщений
```http
GET /api/messages
Authorization: Bearer <token>
Query Parameters:
  - page: number
  - limit: number
```

### Отправка сообщения
```http
POST /api/messages
Authorization: Bearer <token>
Content-Type: application/json

{
  "recipientId": "user_id",
  "content": "Текст сообщения"
}
```

## Загрузка файлов

### Загрузка изображения
```http
POST /api/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
  - image: File
```

## Коды ответов

- 200: Успешный запрос
- 201: Ресурс создан
- 400: Неверный запрос
- 401: Не авторизован
- 403: Доступ запрещен
- 404: Ресурс не найден
- 500: Внутренняя ошибка сервера

## Обработка ошибок

Все ошибки возвращаются в формате:
```json
{
  "message": "Описание ошибки",
  "errors": {
    "field": ["Сообщение об ошибке"]
  }
}
```

## Пагинация

Все списки поддерживают пагинацию через query параметры:
- page: номер страницы (начиная с 1)
- limit: количество элементов на странице

Ответ включает метаданные:
```json
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

## Аутентификация

Все защищенные эндпоинты требуют JWT токен в заголовке:
```
Authorization: Bearer <token>
```

Токен получается при входе и действителен 24 часа. 