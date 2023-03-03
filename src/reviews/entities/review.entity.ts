import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('reviews')
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ default: 2 })
  status: number;
  @Column({ default: 0 })
  group: number;
  @Column({ default: 0 })
  depth: number;
  @Column({ default: 0 })
  star: number;
  @Column({ default: '' })
  productIdx: string;
  @Column({ default: '' })
  orderProductIdx: string;
  @Column({ default: '' })
  userIdx: string;
  @Column({ type: 'text', default: '' })
  contents: string;
  @Column({ default: '' })
  author: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
