import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BannerItemEntity } from "./banner-item.entity";

@Entity('banner')
export class BannerEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ default: 2, comment: '배너 상태(1: 미사용, 2: 사용)' })
  status: number;
  @Column({ default: 0, comment: '배너 정렬 번호' })
  order: number;
  @Column({ length: 255, default: '', comment: '배너 아이디' })
  id: string;
  @Column({ length: 255, default: '', comment: '배너 제목' })
  title: string;
  @Column({ type: 'text', length: 255, default: '', comment: '배너 아이템 정보' })
  itemInfo: string;

  @OneToMany(() => BannerItemEntity, (bni) => bni.banner)
  bannerItem: BannerItemEntity[];

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
