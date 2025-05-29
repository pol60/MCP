import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("ratings")
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.ratings)
    @JoinColumn()
    user: User;

    @Column()
    targetType: "doctor" | "clinic" | "insurance";

    @Column()
    targetId: number;

    @Column()
    rating: number;

    @Column({ nullable: true })
    comment: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 