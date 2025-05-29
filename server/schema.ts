import { pgTable, serial, text, timestamp, boolean, integer, jsonb, uuid, varchar, decimal, uniqueIndex, index, primaryKey } from 'drizzle-orm/pg-core';

// Пользователи
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 255 }),
    firstName: varchar('first_name', { length: 100 }),
    lastName: varchar('last_name', { length: 100 }),
    phone: varchar('phone', { length: 20 }),
    role: varchar('role', { length: 20 }).notNull().default('patient'),
    oauthProvider: varchar('oauth_provider', { length: 50 }),
    oauthId: varchar('oauth_id', { length: 255 }),
    status: varchar('status', { length: 20 }).notNull().default('offline'),
    lastSeen: timestamp('last_seen'),
    username: varchar('username', { length: 100 }).unique(),
    isEmailVerified: boolean('is_email_verified').default(false),
    isPhoneVerified: boolean('is_phone_verified').default(false),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
}, table => ({
    statusIdx: index('idx_users_status').on(table.status),
    oauthIdx: index('idx_users_oauth').on(table.oauthProvider, table.oauthId),
}));

// Клиники
export const clinics = pgTable('clinics', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    address: text('address'),
    phone: varchar('phone', { length: 20 }),
    email: varchar('email', { length: 255 }),
    description: text('description'),
    latitude: decimal('latitude', { precision: 10, scale: 8 }),
    longitude: decimal('longitude', { precision: 11, scale: 8 }),
    workingHours: jsonb('working_hours'),
    rating: decimal('rating', { precision: 3, scale: 2 }).default('0'),
    totalRatings: integer('total_ratings').default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
}, table => ({
    locationIdx: index('idx_clinics_location').on(table.latitude, table.longitude),
}));

// Врачи
export const doctors = pgTable('doctors', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
    specialization: varchar('specialization', { length: 255 }),
    experience: integer('experience'),
    education: text('education'),
    description: text('description'),
    licenseNumber: varchar('license_number', { length: 100 }).unique(),
    rating: decimal('rating', { precision: 3, scale: 2 }).default('0'),
    totalRatings: integer('total_ratings').default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Страховые компании
export const insuranceCompanies = pgTable('insurance_companies', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    license: varchar('license', { length: 100 }).notNull().unique(),
    address: text('address').notNull(),
    phone: varchar('phone', { length: 20 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    rating: decimal('rating', { precision: 3, scale: 2 }).default('0'),
    totalRatings: integer('total_ratings').default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Страховые полисы
export const insurancePolicies = pgTable('insurance_policies', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
    companyId: integer('company_id').references(() => insuranceCompanies.id, { onDelete: 'cascade' }),
    policyNumber: varchar('policy_number', { length: 100 }).notNull().unique(),
    startDate: timestamp('start_date').notNull(),
    endDate: timestamp('end_date').notNull(),
    status: varchar('status', { length: 20 }).notNull().default('active'),
    coverageDetails: jsonb('coverage_details'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
}, table => ({
    userIdx: index('idx_insurance_policies_user').on(table.userId),
    companyIdx: index('idx_insurance_policies_company').on(table.companyId),
}));

// Рейтинги и отзывы
export const ratings = pgTable('ratings', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
    targetType: varchar('target_type', { length: 20 }).notNull(), // doctor, clinic, insurance
    targetId: integer('target_id').notNull(),
    rating: integer('rating').notNull(),
    comment: text('comment'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
}, table => ({
    targetIdx: index('idx_ratings_target').on(table.targetType, table.targetId),
}));

// Уведомления
export const notifications = pgTable('notifications', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
    type: varchar('type', { length: 50 }).notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    message: text('message').notNull(),
    data: jsonb('data'),
    isRead: boolean('is_read').default(false),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
}, table => ({
    userIdx: index('idx_notifications_user').on(table.userId, table.isRead),
}));

// Сообщения
export const messages = pgTable('messages', {
    id: serial('id').primaryKey(),
    senderId: integer('sender_id').references(() => users.id, { onDelete: 'cascade' }),
    recipientId: integer('recipient_id').references(() => users.id, { onDelete: 'cascade' }),
    content: text('content').notNull(),
    status: varchar('status', { length: 20 }).notNull().default('sent'),
    readAt: timestamp('read_at'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
}, table => ({
    statusIdx: index('idx_messages_status').on(table.status),
}));

// Вложения к сообщениям
export const messageAttachments = pgTable('message_attachments', {
    id: serial('id').primaryKey(),
    messageId: integer('message_id').references(() => messages.id, { onDelete: 'cascade' }),
    fileName: varchar('file_name', { length: 255 }).notNull(),
    fileType: varchar('file_type', { length: 50 }).notNull(),
    fileSize: integer('file_size').notNull(),
    fileUrl: text('file_url').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
}, table => ({
    messageIdx: index('idx_message_attachments_message').on(table.messageId),
}));

// Документы (с версионированием)
export const documents = pgTable('documents', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 255 }).notNull(),
    type: varchar('type', { length: 50 }).notNull(),
    url: text('url').notNull(),
    ocrText: text('ocr_text'),
    version: integer('version').notNull().default(1),
    versionHistory: jsonb('version_history'),
    metadata: jsonb('metadata'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
}, table => ({
    userIdx: index('idx_documents_user').on(table.userId),
    versionIdx: index('idx_documents_version').on(table.version),
    typeIdx: index('idx_documents_type').on(table.type),
    metadataIdx: index('idx_documents_metadata').on(table.metadata),
    versionHistoryIdx: index('idx_documents_version_history').on(table.versionHistory),
}));

// Аудит
export const auditLogs = pgTable('audit_logs', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
    action: varchar('action', { length: 50 }).notNull(),
    entityType: varchar('entity_type', { length: 50 }).notNull(),
    entityId: integer('entity_id'),
    changes: jsonb('changes'),
    ipAddress: varchar('ip_address', { length: 45 }),
    userAgent: text('user_agent'),
    metadata: jsonb('metadata'),
    context: jsonb('context'),
    createdAt: timestamp('created_at').defaultNow(),
}, table => ({
    userIdx: index('idx_audit_logs_user').on(table.userId),
    entityIdx: index('idx_audit_logs_entity').on(table.entityType, table.entityId),
    createdAtIdx: index('idx_audit_logs_created_at').on(table.createdAt),
    metadataIdx: index('idx_audit_logs_metadata').on(table.metadata),
    contextIdx: index('idx_audit_logs_context').on(table.context),
})); 