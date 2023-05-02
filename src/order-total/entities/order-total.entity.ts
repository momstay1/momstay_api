import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { OrderEntity } from "src/order/entities/order.entity";

@Entity('order_total')
export class OrderTotalEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ length: 255, default: '' })
  orderIdx: string;
  @Column({ type: "decimal", default: 0.00, precision: 10, scale: 2, comment: '주문 총 금액' })
  totalPrice: number;
  @Column({ type: "decimal", default: 0.00, precision: 10, scale: 2, comment: '주문 총 금액' })
  totalPriceEng: number;
  @Column({ type: "decimal", default: 0.00, precision: 10, scale: 2, comment: '취소 주문 총 금액' })
  totalCancelPrice: number;
  @Column({ type: "decimal", default: 0.00, precision: 10, scale: 2, comment: '취소 주문 총 금액' })
  totalCancelPriceEng: number;
  @Column({ type: "decimal", default: 0.00, precision: 10, scale: 2, comment: '배송비' })
  shipPrice: number;
  @Column({ type: "decimal", default: 0.00, precision: 10, scale: 2, comment: '배송비' })
  shipPriceEng: number;
  @Column({ type: "decimal", default: 0.00, precision: 10, scale: 2, comment: '추가배송비' })
  shipAddPrice: number;
  @Column({ type: "decimal", default: 0.00, precision: 10, scale: 2, comment: '추가배송비' })
  shipAddPriceEng: number;
  @Column({ default: 0, comment: '포인트 할인 금액' })
  pointDc: number;
  @Column({ default: 0, comment: '쿠폰 할인 금액' })
  couponDc: number;
  @Column({ default: 0, comment: '배송비 할인 금액' })
  shipDc: number;
  @Column({ type: "decimal", default: 0.00, precision: 10, scale: 2, comment: '할인 계산 후 총 금액' })
  payPrice: number;
  @Column({ type: "decimal", default: 0.00, precision: 10, scale: 2, comment: '최초 주문시 결제된 금액' })
  origPayPrice: number;
  @Column({ type: "decimal", default: 0.00, precision: 10, scale: 2, comment: '할인 계산 후 총 금액' })
  payPriceEng: number;
  @Column({ type: "decimal", default: 0.00, precision: 10, scale: 2, comment: '최초 주문시 결제된 금액' })
  origPayPriceEng: number;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
