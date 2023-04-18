import { ProductEntity } from "src/product/entities/product.entity";
import { UsersEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('reviews')
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ default: 2, comment: '상태 (-1: 삭제, 1: 미등록, 2: 등록)' })
  status: number;
  @Column({ default: 0, comment: '부모 댓글 idx' })
  group: number;
  @Column({ default: 0, comment: '대댓글 정보' })
  depth: number;
  @Column({ default: 0, comment: '평점 (1~10)' })
  star: number;
  @Column({ default: '', comment: '주문 상품 idx' })
  orderProductIdx: string;
  @Column({ type: 'text', default: '', comment: '후기 내용' })
  contents: string;
  @Column({ default: '', comment: '권한 관련 정보 (사용 X)' })
  author: string;
  @Column({ type: 'date', default: '0', comment: '입주일' })
  start: string;
  @Column({ type: 'date', default: '0', comment: '퇴거일' })
  end: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ProductEntity, (product) => product.review, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  product: ProductEntity;

  @ManyToOne(() => UsersEntity, (user) => user.review, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  user: UsersEntity;
}
