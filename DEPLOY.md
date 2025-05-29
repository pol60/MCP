# Инструкция по деплою

## Подготовка к деплою

1. Убедитесь, что у вас есть:
   - Доступ к серверу (SSH)
   - Установленный Node.js (v18+)
   - Установленный PostgreSQL (v14+)
   - Установленный Nginx
   - Установленный PM2

2. Подготовьте переменные окружения:
   ```bash
   # Frontend (.env.production)
   REACT_APP_API_URL=https://api.your-domain.com
   REACT_APP_UPLOAD_URL=https://api.your-domain.com/upload
   
   # Backend (.env)
   NODE_ENV=production
   PORT=3000
   DATABASE_URL=postgresql://user:password@localhost:5432/medical_portal
   JWT_SECRET=your-secret-key
   UPLOAD_DIR=/var/www/uploads
   ```

## Деплой на сервер

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/your-username/medical-portal.git
   cd medical-portal
   ```

2. Установите зависимости:
   ```bash
   # Frontend
   cd frontend
   npm install
   npm run build
   
   # Backend
   cd ../backend
   npm install
   ```

3. Настройте базу данных:
   ```bash
   # Создайте базу данных
   createdb medical_portal
   
   # Примените миграции
   npm run migrate
   
   # Заполните начальными данными
   npm run seed
   ```

4. Настройте Nginx:
   ```nginx
   # /etc/nginx/sites-available/medical-portal
   
   # Frontend
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/medical-portal/frontend/build;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   
   # Backend
   server {
       listen 80;
       server_name api.your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
       
       location /upload {
           alias /var/www/uploads;
           expires 30d;
           add_header Cache-Control "public, no-transform";
       }
   }
   ```

5. Включите конфигурацию:
   ```bash
   sudo ln -s /etc/nginx/sites-available/medical-portal /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

6. Настройте PM2:
   ```bash
   # Запустите приложение
   pm2 start ecosystem.config.js
   
   # Настройте автозапуск
   pm2 startup
   pm2 save
   ```

7. Настройте SSL (Let's Encrypt):
   ```bash
   sudo certbot --nginx -d your-domain.com -d api.your-domain.com
   ```

## Мониторинг и обслуживание

1. Мониторинг через PM2:
   ```bash
   # Просмотр логов
   pm2 logs
   
   # Статистика
   pm2 monit
   
   # Перезапуск
   pm2 restart all
   ```

2. Резервное копирование базы данных:
   ```bash
   # Создание бэкапа
   pg_dump medical_portal > backup.sql
   
   # Восстановление
   psql medical_portal < backup.sql
   ```

3. Обновление приложения:
   ```bash
   # Получение обновлений
   git pull
   
   # Установка зависимостей
   npm install
   
   # Применение миграций
   npm run migrate
   
   # Пересборка frontend
   cd frontend
   npm run build
   
   # Перезапуск приложения
   pm2 restart all
   ```

## Безопасность

1. Настройте файрвол:
   ```bash
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw allow 22/tcp
   sudo ufw enable
   ```

2. Настройте регулярные обновления:
   ```bash
   sudo apt update
   sudo apt upgrade
   ```

3. Настройте мониторинг безопасности:
   ```bash
   # Установка fail2ban
   sudo apt install fail2ban
   
   # Настройка конфигурации
   sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
   ```

## Масштабирование

1. Настройка балансировки нагрузки:
   ```nginx
   upstream backend {
       server localhost:3000;
       server localhost:3001;
       server localhost:3002;
   }
   ```

2. Настройка кэширования:
   ```nginx
   location /api {
       proxy_cache my_cache;
       proxy_cache_use_stale error timeout http_500 http_502 http_503 http_504;
       proxy_cache_valid 200 60m;
   }
   ```

3. Настройка сжатия:
   ```nginx
   gzip on;
   gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
   ``` 