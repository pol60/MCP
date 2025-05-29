import { config } from 'dotenv';

config();

export const authConfig = {
    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    },
    oauth: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        }
    },
    sms: {
        provider: process.env.SMS_PROVIDER || 'twilio',
        twilio: {
            accountSid: process.env.TWILIO_ACCOUNT_SID,
            authToken: process.env.TWILIO_AUTH_TOKEN,
            fromNumber: process.env.TWILIO_FROM_NUMBER
        }
    },
    email: {
        provider: process.env.EMAIL_PROVIDER || 'nodemailer',
        smtp: {
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        }
    },
    storage: {
        provider: process.env.STORAGE_PROVIDER || 's3',
        s3: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
            bucket: process.env.AWS_BUCKET
        },
        cloudflare: {
            accountId: process.env.CF_ACCOUNT_ID,
            accessKeyId: process.env.CF_ACCESS_KEY_ID,
            secretAccessKey: process.env.CF_SECRET_ACCESS_KEY,
            bucket: process.env.CF_BUCKET
        }
    },
    encryption: {
        algorithm: 'aes-256-gcm',
        key: process.env.ENCRYPTION_KEY,
        ivLength: 16,
        saltLength: 64,
        tagLength: 16
    }
}; 