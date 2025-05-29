import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm'
import { Doctor } from './Doctor'
import { Appointment } from './Appointment'
import { Rating } from './Rating'

@Entity('clinics')
export class Clinic {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  address: string

  @Column()
  phone: string

  @Column({ nullable: true })
  email: string

  @Column({ nullable: true })
  description: string

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude: number

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude: number

  @Column({ type: 'jsonb', nullable: true })
  workingHours: {
    [key: string]: {
      open: string
      close: string
    }
  }

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  rating: number

  @Column({ default: 0 })
  totalRatings: number

  @ManyToMany(() => Doctor, doctor => doctor.clinics)
  @JoinTable()
  doctors: Doctor[]

  @OneToMany(() => Appointment, appointment => appointment.clinic)
  appointments: Appointment[]

  @OneToMany(() => Rating, rating => rating.target, { where: { targetType: 'clinic' } })
  ratings: Rating[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
} 