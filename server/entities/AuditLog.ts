import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("audit_logs")
export class AuditLog {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn()
    user: User;

    @Column()
    action: string;

    @Column()
    entityType: string;

    @Column({ nullable: true })
    entityId: number;

    @Column({ type: "jsonb", nullable: true })
    changes: Record<string, any>;

    @Column({ nullable: true })
    ipAddress: string;

    @Column({ nullable: true })
    userAgent: string;

    @Column({ type: "jsonb", nullable: true })
    metadata: {
        browser: string;
        os: string;
        device: string;
        location: string;
        screenResolution: string;
        language: string;
        timezone: string;
        referrer: string;
        requestId: string;
        responseTime: number;
        statusCode: number;
    };

    @Column({ type: "jsonb", nullable: true })
    context: {
        module: string;
        function: string;
        parameters: Record<string, any>;
        stackTrace: string;
        errorMessage: string;
    };

    @CreateDateColumn()
    createdAt: Date;
} 