import { ProductEntity } from "src/product/entities/product.entity";
import { UsersEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
  orderProductIdx: string;
  @Column({ type: 'text', default: '' })
  contents: string;
  @Column({ default: '' })
  author: string;

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
