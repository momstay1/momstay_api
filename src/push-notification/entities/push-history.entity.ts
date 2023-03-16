import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('push_history')
export class PushHistoryEntity {
  @PrimaryGeneratedColumn()
  idx: number;
  @Column({ length: 255, default: '' })
  status: string;
  @Column({ length: 255, default: '' })
  title: string;
  @Column({ type: 'text', default: '' })
  content: string;
  @Column({ length: 255, default: '' })
  topic: string;
  @Column({ length: 255, default: '' })
  token: string;
  @Column({ length: 255, default: '' })
  userIdx: string;
  @Column({ type: 'text', default: '' })
  data: string;
  @Column({ type: 'text', default: '' })
  notifications: string;
  @Column({ type: 'text', default: '' })
  error: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
