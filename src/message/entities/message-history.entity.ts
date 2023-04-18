import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('message_history')
export class MessageHistoryEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ default: '', comment: '메세지타입' })
  type: string;
  @Column({ default: '', length: 255, comment: '템플릿 코드' })
  templateCode: string;
  @Column({ type: 'text', comment: '요청 내용' })
  req: string;
  @Column({ type: 'text', comment: '응답 내용' })
  res: string;
  @Column({ default: '', length: 255, comment: '응답 타입' })
  resType: string;
  @Column({ default: '', comment: '응답 코드' })
  resCode: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
