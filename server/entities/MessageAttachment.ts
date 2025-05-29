import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Message } from "./Message";

@Entity("message_attachments")
export class MessageAttachment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Message, message => message.attachments)
    @JoinColumn()
    message: Message;

    @Column()
    fileName: string;

    @Column()
    fileType: string;

    @Column()
    fileSize: number;

    @Column()
    fileUrl: string;

    @CreateDateColumn()
    createdAt: Date;
} 