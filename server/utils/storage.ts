import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { authConfig } from '../config/auth';

export class Storage {
    private static s3Client: S3Client;

    private static getS3Client(): S3Client {
        if (!this.s3Client) {
            this.s3Client = new S3Client({
                region: authConfig.storage.s3.region,
                credentials: {
                    accessKeyId: authConfig.storage.s3.accessKeyId,
                    secretAccessKey: authConfig.storage.s3.secretAccessKey
                }
            });
        }
        return this.s3Client;
    }

    static async uploadFile(file: Buffer, fileName: string, contentType: string): Promise<string> {
        const s3Client = this.getS3Client();
        
        const command = new PutObjectCommand({
            Bucket: authConfig.storage.s3.bucket,
            Key: fileName,
            Body: file,
            ContentType: contentType
        });

        await s3Client.send(command);
        return fileName;
    }

    static async getFileUrl(fileName: string, expiresIn = 3600): Promise<string> {
        const s3Client = this.getS3Client();
        
        const command = new GetObjectCommand({
            Bucket: authConfig.storage.s3.bucket,
            Key: fileName
        });

        return getSignedUrl(s3Client, command, { expiresIn });
    }

    static async deleteFile(fileName: string): Promise<void> {
        const s3Client = this.getS3Client();
        
        const command = new DeleteObjectCommand({
            Bucket: authConfig.storage.s3.bucket,
            Key: fileName
        });

        await s3Client.send(command);
    }

    static generateFileName(originalName: string, userId: number): string {
        const timestamp = Date.now();
        const extension = originalName.split('.').pop();
        return `users/${userId}/${timestamp}-${Math.random().toString(36).substring(7)}.${extension}`;
    }

    static async getUploadUrl(fileName: string, contentType: string, expiresIn = 3600): Promise<string> {
        const s3Client = this.getS3Client();
        
        const command = new PutObjectCommand({
            Bucket: authConfig.storage.s3.bucket,
            Key: fileName,
            ContentType: contentType
        });

        return getSignedUrl(s3Client, command, { expiresIn });
    }
} 