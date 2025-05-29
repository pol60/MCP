import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { User } from './User'
import { MessageAttachment } from './MessageAttachment'

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, user => user.sentMessages)
  @JoinColumn()
  sender: User

  @ManyToOne(() => User, user => user.receivedMessages)
  @JoinColumn()
  recipient: User

  @Column()
  content: string

  @Column({ default: 'sent' })
  status: 'sent' | 'delivered' | 'read'

  @Column({ nullable: true })
  readAt: Date

  @OneToMany(() => MessageAttachment, attachment => attachment.message)
  attachments: MessageAttachment[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
} 