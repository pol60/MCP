import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1709123456789 implements MigrationInterface {
    name = 'CreateInitialTables1709123456789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Создание таблицы пользователей
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL PRIMARY KEY,
                "email" VARCHAR(255) NOT NULL UNIQUE,
                "password" VARCHAR(255) NOT NULL,
                "firstName" VARCHAR(255) NOT NULL,
                "lastName" VARCHAR(255) NOT NULL,
                "phone" VARCHAR(20),
                "role" VARCHAR(20) NOT NULL DEFAULT 'patient',
                "oauthProvider" VARCHAR(50),
                "oauthId" VARCHAR(255),
                "status" VARCHAR(20) DEFAULT 'offline' CHECK (status IN ('online', 'offline', 'typing')),
                "lastSeen" TIMESTAMP,
                "username" VARCHAR(100) UNIQUE,
                "isEmailVerified" BOOLEAN DEFAULT false,
                "isPhoneVerified" BOOLEAN DEFAULT false,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);

        // Создание таблицы докторов
        await queryRunner.query(`
            CREATE TABLE "doctors" (
                "id" SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES "users"("id") ON DELETE CASCADE,
                "specialization" VARCHAR(255) NOT NULL,
                "experience" INTEGER NOT NULL,
                "education" TEXT NOT NULL,
                "description" TEXT,
                "licenseNumber" VARCHAR(100) UNIQUE NOT NULL,
                "rating" DECIMAL(3, 2) DEFAULT 0,
                "totalRatings" INTEGER DEFAULT 0,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);

        // Создание таблицы клиник
        await queryRunner.query(`
            CREATE TABLE "clinics" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(255) NOT NULL,
                "address" TEXT NOT NULL,
                "phone" VARCHAR(20) NOT NULL,
                "email" VARCHAR(255),
                "description" TEXT,
                "latitude" DECIMAL(10, 8),
                "longitude" DECIMAL(11, 8),
                "workingHours" JSONB,
                "rating" DECIMAL(3, 2) DEFAULT 0,
                "totalRatings" INTEGER DEFAULT 0,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);

        // Создание таблицы страховых компаний
        await queryRunner.query(`
            CREATE TABLE "insurance_companies" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(255) NOT NULL,
                "license" VARCHAR(100) UNIQUE NOT NULL,
                "address" TEXT NOT NULL,
                "phone" VARCHAR(20) NOT NULL,
                "email" VARCHAR(255) NOT NULL,
                "rating" DECIMAL(3, 2) DEFAULT 0,
                "totalRatings" INTEGER DEFAULT 0,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);

        // Создание таблицы страховых полисов
        await queryRunner.query(`
            CREATE TABLE "insurance_policies" (
                "id" SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES "users"("id") ON DELETE CASCADE,
                "companyId" INTEGER REFERENCES "insurance_companies"("id") ON DELETE CASCADE,
                "policyNumber" VARCHAR(100) UNIQUE NOT NULL,
                "startDate" DATE NOT NULL,
                "endDate" DATE NOT NULL,
                "status" VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'suspended')),
                "coverageDetails" JSONB,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);

        // Создание таблицы записей на прием
        await queryRunner.query(`
            CREATE TABLE "appointments" (
                "id" SERIAL PRIMARY KEY,
                "patientId" INTEGER REFERENCES "users"("id") ON DELETE CASCADE,
                "doctorId" INTEGER REFERENCES "doctors"("id") ON DELETE CASCADE,
                "clinicId" INTEGER REFERENCES "clinics"("id") ON DELETE CASCADE,
                "date" TIMESTAMP NOT NULL,
                "status" VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
                "type" VARCHAR(20) NOT NULL DEFAULT 'offline' CHECK (type IN ('offline', 'online', 'home_visit')),
                "reason" TEXT,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);

        // Создание таблицы сообщений
        await queryRunner.query(`
            CREATE TABLE "messages" (
                "id" SERIAL PRIMARY KEY,
                "senderId" INTEGER REFERENCES "users"("id") ON DELETE CASCADE,
                "recipientId" INTEGER REFERENCES "users"("id") ON DELETE CASCADE,
                "content" TEXT NOT NULL,
                "status" VARCHAR(20) DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'read')),
                "readAt" TIMESTAMP,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);

        // Создание таблицы для прикрепленных файлов к сообщениям
        await queryRunner.query(`
            CREATE TABLE "message_attachments" (
                "id" SERIAL PRIMARY KEY,
                "messageId" INTEGER REFERENCES "messages"("id") ON DELETE CASCADE,
                "fileName" VARCHAR(255) NOT NULL,
                "fileType" VARCHAR(50) NOT NULL,
                "fileSize" INTEGER NOT NULL,
                "fileUrl" TEXT NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);

        // Создание таблицы документов
        await queryRunner.query(`
            CREATE TABLE "documents" (
                "id" SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES "users"("id") ON DELETE CASCADE,
                "name" VARCHAR(255) NOT NULL,
                "type" VARCHAR(50) NOT NULL,
                "url" TEXT NOT NULL,
                "ocrText" TEXT,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);

        // Создание таблицы рейтингов и отзывов
        await queryRunner.query(`
            CREATE TABLE "ratings" (
                "id" SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES "users"("id") ON DELETE CASCADE,
                "targetType" VARCHAR(20) NOT NULL CHECK (targetType IN ('doctor', 'clinic', 'insurance')),
                "targetId" INTEGER NOT NULL,
                "rating" INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
                "comment" TEXT,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);

        // Создание таблицы уведомлений
        await queryRunner.query(`
            CREATE TABLE "notifications" (
                "id" SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES "users"("id") ON DELETE CASCADE,
                "type" VARCHAR(50) NOT NULL,
                "title" VARCHAR(255) NOT NULL,
                "message" TEXT NOT NULL,
                "data" JSONB,
                "isRead" BOOLEAN DEFAULT false,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);

        // Создание таблицы для логирования действий
        await queryRunner.query(`
            CREATE TABLE "audit_logs" (
                "id" SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES "users"("id") ON DELETE SET NULL,
                "action" VARCHAR(50) NOT NULL,
                "entityType" VARCHAR(50) NOT NULL,
                "entityId" INTEGER,
                "changes" JSONB,
                "ipAddress" VARCHAR(45),
                "userAgent" TEXT,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);

        // Создание индексов для оптимизации
        await queryRunner.query(`
            CREATE INDEX "idx_users_status" ON "users"("status");
            CREATE INDEX "idx_users_oauth" ON "users"("oauthProvider", "oauthId");
            CREATE INDEX "idx_clinics_location" ON "clinics"("latitude", "longitude");
            CREATE INDEX "idx_insurance_policies_user" ON "insurance_policies"("userId");
            CREATE INDEX "idx_insurance_policies_company" ON "insurance_policies"("companyId");
            CREATE INDEX "idx_ratings_target" ON "ratings"("targetType", "targetId");
            CREATE INDEX "idx_notifications_user" ON "notifications"("userId", "isRead");
            CREATE INDEX "idx_messages_status" ON "messages"("status");
            CREATE INDEX "idx_message_attachments_message" ON "message_attachments"("messageId");
            CREATE INDEX "idx_audit_logs_user" ON "audit_logs"("userId");
            CREATE INDEX "idx_audit_logs_entity" ON "audit_logs"("entityType", "entityId");
            CREATE INDEX "idx_appointments_patient" ON "appointments"("patientId");
            CREATE INDEX "idx_appointments_doctor" ON "appointments"("doctorId");
            CREATE INDEX "idx_appointments_clinic" ON "appointments"("clinicId");
            CREATE INDEX "idx_appointments_date" ON "appointments"("date");
            CREATE INDEX "idx_documents_user" ON "documents"("userId");
            CREATE INDEX "idx_documents_version" ON "documents"("version");
            CREATE INDEX "idx_documents_type" ON "documents"("type");
            CREATE INDEX "idx_audit_logs_metadata" ON "audit_logs" USING GIN ("metadata");
            CREATE INDEX "idx_audit_logs_context" ON "audit_logs" USING GIN ("context");
            CREATE INDEX "idx_audit_logs_created_at" ON "audit_logs"("createdAt");
            CREATE INDEX "idx_documents_metadata" ON "documents" USING GIN ("metadata");
            CREATE INDEX "idx_documents_version_history" ON "documents" USING GIN ("versionHistory");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Удаление индексов
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_documents_version_history"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_documents_metadata"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_audit_logs_created_at"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_audit_logs_context"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_audit_logs_metadata"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_documents_type"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_documents_version"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_documents_user"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_appointments_date"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_appointments_clinic"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_appointments_doctor"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_appointments_patient"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_audit_logs_entity"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_audit_logs_user"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_message_attachments_message"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_messages_status"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_notifications_user"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_ratings_target"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_insurance_policies_company"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_insurance_policies_user"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_clinics_location"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_users_oauth"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_users_status"`);

        // Удаление таблиц
        await queryRunner.query(`DROP TABLE IF EXISTS "audit_logs"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "notifications"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "ratings"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "documents"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "message_attachments"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "messages"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "appointments"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "insurance_policies"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "insurance_companies"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "clinics"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "doctors"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
    }
} 