import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { UsersEntity } from "src/users/entities/user.entity";
import { OrderEntity } from "src/order/entities/order.entity";

@Entity('order_product')
export class OrderProductEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ default: 0 })
  status: number;
  @Column({ length: 255, default: '' })
  code: string;
  @Column({ length: 255, default: '' })
  eq: string;
  @Column({ length: 255, default: '' })
  productOptionIdx: string;
  @Column({ length: 255, default: '' })
  productOptionCode: string;
  @Column({ length: 255, default: '' })
  productType: string;

  @Column({ length: 255, default: '' })
  parcelCode: string;
  @Column({ length: 255, default: '' })
  title: string;
  @Column({ length: 255, default: '' })
  options: string;
  @Column({ length: 255, default: '' })
  img: string;
  @Column({ default: 0 })
  num: number;
  @Column({ type: "decimal", default: 0.00, precision: 10, scale: 2 })
  price: number;
  @Column({ type: "decimal", default: 0.00, precision: 10, scale: 2 })
  tax: number;
  @Column({ type: "decimal", default: 0.00, precision: 10, scale: 2 })
  fee: number;
  @Column({ default: 0 })
  point: number;
  @Column({ type: "decimal", default: 0.00, precision: 10, scale: 2 })
  payPrice: number;
  @Column({ type: "decimal", default: 0.00, precision: 10, scale: 2 })
  refundPrice: number;
  @Column({ default: 0 })
  refundPoint: number;
  @Column({ type: 'text', default: '' })
  memo: string;

  @Column({ type: 'date', default: '0' })
  startAt: string;
  @Column({ type: 'date', default: '0' })
  endAt: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UsersEntity, (user) => user.orderProduct, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  user: UsersEntity;
  @ManyToOne(() => OrderEntity, (order) => order.orderProduct, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  order: OrderEntity;

}
