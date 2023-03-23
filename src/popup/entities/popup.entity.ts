import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('popup')
export class PopupEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ default: 2, comment: '상태 (1: 삭제, 2: 등록)' })
  status: number;
  @Column({ default: '', comment: '팝업명' })
  title: string;
  @Column({ type: 'date', default: '0', comment: '팝업 노출 시작일' })
  startPeriod: Date | string;
  @Column({ type: 'date', default: '0', comment: '팝업 노출 종료일' })
  endPeriod: Date | string;
  @Column({ default: 10, comment: '팝업 노출 순위' })
  order: number;
  @Column({ default: '', comment: '팝업 링크' })
  link: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
