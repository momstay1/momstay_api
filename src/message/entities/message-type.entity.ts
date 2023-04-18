import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('message_type')
export class MessageTypeEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ default: '', length: 255, comment: '메시지 유형' })
  type: string;
  @Column({ default: '', length: 255, comment: '메시지 제목' })
  title: string;
  @Column({ type: 'text', comment: '메시지 메모 (치환코드)' })
  memo: string;
}
