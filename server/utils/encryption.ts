import crypto from 'crypto';
import { authConfig } from '../config/auth';

export class Encryption {
    private static readonly algorithm = authConfig.encryption.algorithm;
    private static readonly key = Buffer.from(authConfig.encryption.key || '', 'hex');
    private static readonly ivLength = authConfig.encryption.ivLength;
    private static readonly saltLength = authConfig.encryption.saltLength;
    private static readonly tagLength = authConfig.encryption.tagLength;

    static encrypt(text: string): string {
        const iv = crypto.randomBytes(this.ivLength);
        const salt = crypto.randomBytes(this.saltLength);
        
        const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        const tag = cipher.getAuthTag();
        
        // Combine IV, salt, tag, and encrypted data
        return Buffer.concat([salt, iv, tag, Buffer.from(encrypted, 'hex')]).toString('base64');
    }

    static decrypt(encryptedData: string): string {
        const buffer = Buffer.from(encryptedData, 'base64');
        
        // Extract components
        const salt = buffer.slice(0, this.saltLength);
        const iv = buffer.slice(this.saltLength, this.saltLength + this.ivLength);
        const tag = buffer.slice(this.saltLength + this.ivLength, this.saltLength + this.ivLength + this.tagLength);
        const encrypted = buffer.slice(this.saltLength + this.ivLength + this.tagLength);
        
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
        decipher.setAuthTag(tag);
        
        let decrypted = decipher.update(encrypted);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        
        return decrypted.toString('utf8');
    }

    static hashPassword(password: string): string {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        return `${salt}:${hash}`;
    }

    static verifyPassword(password: string, hashedPassword: string): boolean {
        const [salt, hash] = hashedPassword.split(':');
        const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        return hash === verifyHash;
    }
} 