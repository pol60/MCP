import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { InsuranceCompany } from "./InsuranceCompany";

@Entity("insurance_policies")
export class InsurancePolicy {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.insurancePolicies)
    @JoinColumn()
    user: User;

    @ManyToOne(() => InsuranceCompany, company => company.policies)
    @JoinColumn()
    company: InsuranceCompany;

    @Column({ unique: true })
    policyNumber: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column({ default: "active" })
    status: "active" | "expired" | "suspended";

    @Column({ type: "jsonb", nullable: true })
    coverageDetails: {
        [key: string]: {
            limit: number;
            deductible: number;
            copay: number;
        };
    };

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 