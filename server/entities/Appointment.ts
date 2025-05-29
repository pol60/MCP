import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { User } from './User'
import { Doctor } from './Doctor'
import { Clinic } from './Clinic'

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, user => user.patientAppointments)
  @JoinColumn()
  patient: User

  @ManyToOne(() => Doctor, doctor => doctor.appointments)
  @JoinColumn()
  doctor: Doctor

  @ManyToOne(() => Clinic, clinic => clinic.appointments)
  @JoinColumn()
  clinic: Clinic

  @Column()
  date: Date

  @Column({ default: 'pending' })
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'

  @Column({ default: 'offline' })
  type: 'offline' | 'online' | 'home_visit'

  @Column({ nullable: true })
  reason: string

  @Column('text', { nullable: true })
  notes: string

  @Column('text', { nullable: true })
  diagnosis: string

  @Column('text', { nullable: true })
  prescription: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
} 