import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { User } from './User'
import { Appointment } from './Appointment'
import { Clinic } from './Clinic'
import { Rating } from './Rating'

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => User, user => user.doctor)
  @JoinColumn()
  user: User

  @Column()
  specialization: string

  @Column()
  experience: number

  @Column()
  education: string

  @Column({ nullable: true })
  description: string

  @Column({ unique: true })
  licenseNumber: string

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  rating: number

  @Column({ default: 0 })
  totalRatings: number

  @OneToMany(() => Appointment, appointment => appointment.doctor)
  appointments: Appointment[]

  @OneToMany(() => Clinic, (clinic) => clinic.doctors)
  clinics: Clinic[]

  @OneToMany(() => Rating, rating => rating.target, { where: { targetType: 'doctor' } })
  ratings: Rating[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
} 