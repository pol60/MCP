import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("notifications")
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.notifications)
    @JoinColumn()
    user: User;

    @Column()
    type: string;

    @Column()
    title: string;

    @Column()
    message: string;

    @Column({ type: "jsonb", nullable: true })
    data: Record<string, any>;

    @Column({ default: false })
    isRead: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 