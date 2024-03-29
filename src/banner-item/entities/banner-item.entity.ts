import { BannerEntity } from "src/banner/entities/banner.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity('banner_item')
export class BannerItemEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ default: 2, comment: '배너 아이템 상태(1: 미사용, 2: 사용)' })
  status: number;
  @Column({ default: 0, comment: '배너 아이템 순서' })
  order: number;
  @Column({ type: 'text', default: '', comment: '배너 아이템 정보' })
  content: string;
  @Column({ type: 'datetime', default: '0', comment: '배너 아이템 시작시간' })
  start: string;
  @Column({ type: 'datetime', default: '0', comment: '배너 아이템 종료시간' })
  end: string;

  @ManyToOne(() => BannerEntity, (bn) => bn.bannerItem)
  banner: BannerEntity;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
