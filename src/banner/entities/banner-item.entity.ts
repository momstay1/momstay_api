import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BannerEntity } from "./banner.entity";

@Entity('banner_item')
export class BannerItemEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ default: 2, comment: '배너 아이템 상태(1: 미사용, 2: 사용)' })
  status: number;
  @Column({ default: 0, comment: '배너 아이템 정렬 번호' })
  order: number;
  @Column({ length: 255, default: '', comment: '배너 아이템 제목' })
  title: string;
  @Column({ type: 'text', length: 255, default: '', comment: '배너 아이템 정보' })
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
