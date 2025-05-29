import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { config } from 'dotenv';
import { join } from 'path';

config();

if (!process.env.DATABASE_URL) {
    throw new Error(
        "DATABASE_URL must be set. Did you forget to provision a database?"
    );
}

console.log('Connecting to database:', process.env.DATABASE_URL);

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
    } : false
});

// Проверяем подключение
pool.on('connect', () => {
    console.log('✅ Successfully connected to database');
});

pool.on('error', (err) => {
    console.error('❌ Database connection error:', err);
});

// Тестируем подключение
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Database test query failed:', err);
    } else {
        console.log('✅ Database test query successful:', res.rows[0]);
    }
});

export const db = drizzle(pool);

// Функция для запуска миграций
export async function runMigrations() {
    try {
        await migrate(db, { migrationsFolder: join(__dirname, '../migrations') });
        console.log('✅ Migrations completed successfully');
    } catch (error) {
        console.error('❌ Migration failed:', error);
        throw error;
    }
} 