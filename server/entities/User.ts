import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm'
import { Appointment } from './Appointment'
import { Message } from './Message'
import { Doctor } from './Doctor'
import { Document } from './Document'
import { InsurancePolicy } from './InsurancePolicy'
import { Rating } from './Rating'
import { Notification } from './Notification'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({ nullable: true })
  phone: string

  @Column({ default: 'patient' })
  role: 'patient' | 'doctor' | 'admin'

  @Column({ nullable: true })
  oauthProvider: string

  @Column({ nullable: true })
  oauthId: string

  @Column({ default: 'offline' })
  status: 'online' | 'offline' | 'typing'

  @Column({ nullable: true })
  lastSeen: Date

  @Column({ unique: true, nullable: true })
  username: string

  @Column({ default: false })
  isEmailVerified: boolean

  @Column({ default: false })
  isPhoneVerified: boolean

  @OneToOne(() => Doctor, doctor => doctor.user)
  doctor: Doctor

  @OneToMany(() => Appointment, appointment => appointment.patient)
  patientAppointments: Appointment[]

  @OneToMany(() => Message, message => message.sender)
  sentMessages: Message[]

  @OneToMany(() => Message, message => message.recipient)
  receivedMessages: Message[]

  @OneToMany(() => Document, document => document.user)
  documents: Document[]

  @OneToMany(() => InsurancePolicy, policy => policy.user)
  insurancePolicies: InsurancePolicy[]

  @OneToMany(() => Rating, rating => rating.user)
  ratings: Rating[]

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
} 