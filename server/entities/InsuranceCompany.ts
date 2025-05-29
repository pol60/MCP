import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { InsurancePolicy } from "./InsurancePolicy";
import { Rating } from "./Rating";

@Entity("insurance_companies")
export class InsuranceCompany {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    license: string;

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column({ type: "decimal", precision: 3, scale: 2, default: 0 })
    rating: number;

    @Column({ default: 0 })
    totalRatings: number;

    @OneToMany(() => InsurancePolicy, policy => policy.company)
    policies: InsurancePolicy[];

    @OneToMany(() => Rating, rating => rating.target, { where: { targetType: "insurance" } })
    ratings: Rating[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 