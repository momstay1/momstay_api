import { ProductEntity } from "src/product/entities/product.entity";
import { UsersEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("product_option")
export class ProductOptionEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ default: 2 })
  status: number;
  @Column({ default: '' })
  type: string;
  @Column({ default: '' })
  order: string;

  @Column({ default: '' })  // 투숙 상태
  stayStatus: string;
  @Column({ default: '' })  // 방문예약상태
  visitStatus: string;
  @Column({ default: '' })  // 바로결제 상태
  paymentStatus: string;

  @Column({ default: '' })
  title: string;
  @Column({ default: 0 })
  price: number;
  @Column({ default: 0 })
  priceMonth: number;
  @Column({ default: 0 })
  priceWeek: number;
  @Column({ default: 0 })
  priceDay: number;
  @Column({ type: 'text', default: '' })
  detailsKor: string;
  @Column({ type: 'text', default: '' })
  detailsEng: string;
  @Column({ type: 'text', default: '' })
  detailsJpn: string;
  @Column({ type: 'text', default: '' })
  detailsChn: string;
  @Column({ default: '' })
  oldIdx: string;
  @Column({ type: 'text', default: '' })
  oldData: string;

  @Column({ default: '' })
  privateFacility: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ProductEntity, (product) => product.productOption, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  product: ProductEntity;
}
