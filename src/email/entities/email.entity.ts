import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('email')
export class EmailEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ default: 2, comment: '메일 사용여부 (1: 미사용, 2: 사용)' })
  status: number;
  @Column({ length: 255, default: '', comment: '메일 발송 유형' })
  type: string;
  @Column({ length: 255, default: '', comment: '발송 그룹 (admin|host|guest)' })
  group: string;
  @Column({ length: 255 })
  code: string;
  @Column({ length: 255, default: '', comment: '언어' })
  language: string;
  @Column({ length: 255, default: '', comment: '메일 제목' })
  title: string;
  @Column({ length: 255, default: '', comment: '메일 설명' })
  content: string;
  @Column({ type: 'text', default: '' })
  template: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
