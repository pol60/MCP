import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("documents")
export class Document {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.documents)
    @JoinColumn()
    user: User;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    url: string;

    @Column({ nullable: true })
    ocrText: string;

    @Column({ default: 1 })
    version: number;

    @Column({ type: "jsonb", nullable: true })
    versionHistory: {
        version: number;
        changes: string;
        updatedAt: Date;
        updatedBy: number;
    }[];

    @Column({ type: "jsonb", nullable: true })
    metadata: {
        originalName: string;
        mimeType: string;
        size: number;
        hash: string;
        lastModified: Date;
    };

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 