import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { UsersEntity } from "src/users/entities/user.entity";
import { OrderProductEntity } from "src/order-product/entities/order-product.entity";

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ default: 0 })
  status: number;
  @Column({ length: 255, default: '' })
  code: string;
  @Column({ length: 255, default: '' })
  imp_uid: string;
  @Column({ length: 255, default: '' })
  billingKey: string;
  @Column({ length: 255, default: '' })
  payment: string;

  @Column({ length: 255, default: '' })
  clientName: string;
  @Column({ length: 255, default: '' })
  clientEmail: string;
  @Column({ length: 255, default: '' })
  clientPhone1: string;
  @Column({ length: 255, default: '' })
  clientPhone2: string;
  @Column({ length: 255, default: '' })
  inPostCode: string;
  @Column({ length: 255, default: '' })
  inAddr1: string;
  @Column({ length: 255, default: '' })
  inAddr2: string;

  @Column({ length: 255, default: '' })
  shipName: string;
  @Column({ length: 255, default: '' })
  shipPhone1: string;
  @Column({ length: 255, default: '' })
  shipPhone2: string;
  @Column({ length: 255, default: '' })
  shipArea: string;
  @Column({ length: 255, default: '' })
  shipPostCode: string;
  @Column({ length: 255, default: '' })
  shipNation: string;
  @Column({ length: 255, default: '' })
  shipState: string;
  @Column({ length: 255, default: '' })
  shipCity: string;
  @Column({ length: 255, default: '' })
  shipAddr1: string;
  @Column({ length: 255, default: '' })
  shipAddr2: string;

  @Column({ length: 255, default: '' })
  bank: string;
  @Column({ length: 255, default: '' })
  account: string;
  @Column({ length: 255, default: '' })
  depositer: string;
  @Column({ length: 255, default: '' })
  remitter: string;

  @Column({ type: 'text', default: '' })
  clientMemo: string;
  @Column({ type: 'text', default: '' })
  adminMemo: string;

  @Column({ length: 255, default: '' })
  pc_mobile: string;
  @Column({ type: 'text', default: '' })
  userAgent: string;

  @Column({ length: 255, default: '' })
  paiedAt: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderProductEntity, (op) => op.order)
  orderProduct: OrderProductEntity[];

  @ManyToOne(() => UsersEntity, (user) => user.order, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  user: UsersEntity;

}
