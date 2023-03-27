import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('message')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ default: 2, comment: '메시지 사용 여부' })
  status: number;
  @Column({ default: '', length: 255, comment: '메시지 그룹' })
  group: string;
  @Column({ default: '', length: 255, comment: '메시지 유형' })
  type: string;
  @Column({ default: '', length: 255, comment: '메시지 보내기 유형(alimtalk | sms)' })
  sendtype: string;
  @Column({ default: '', length: 255, comment: '메시지 코드 (알림톡 사용시 필요)' })
  code: string;
  @Column({ type: 'text', comment: '메시지 내용' })
  tmpl: string;
  @Column({ type: 'text', comment: '메시지 버튼(알림톡 버튼 설정시 필요)' })
  buttons: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
