import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Entity } from "typeorm";

@Entity('pg_data')
export class PgDataEntity {
  @PrimaryGeneratedColumn()
  idx: number;
  @Column({ length: 255, default: '' })
  productCode: string;
  @Column({ default: 0 })
  amount: number;
  @Column({ length: 255, default: '' })
  imp_uid: string;
  @Column({ length: 255, default: '' })
  merchant_uid: string;
  @Column({ length: 255, default: '' })
  pay_method: string;
  @Column({ length: 255, default: '' })
  channel: string;
  @Column({ length: 255, default: '' })
  pg_provider: string;
  @Column({ length: 255, default: '' })
  pg_tid: string;
  @Column({ length: 255, default: '' })
  pg_id: string;
  @Column({ length: 255, default: '' })
  escrow: string;
  @Column({ length: 255, default: '' })
  apply_num: string;
  @Column({ length: 255, default: '' })
  bank_code: string;
  @Column({ length: 255, default: '' })
  bank_name: string;
  @Column({ length: 255, default: '' })
  card_code: string;
  @Column({ length: 255, default: '' })
  card_name: string;
  @Column({ default: 0 })
  card_quota: number;
  @Column({ default: 0 })
  card_number: string;
  @Column({ length: 255, default: '' })
  card_type: string;
  @Column({ length: 255, default: '' })
  vbank_code: string;
  @Column({ length: 255, default: '' })
  vbank_name: string;
  @Column({ length: 255, default: '' })
  vbank_num: string;
  @Column({ length: 255, default: '' })
  vbank_holder: string;
  @Column({ default: 0 })
  vbank_date: number;
  @Column({ default: 0 })
  vbank_issued_at: number;
  @Column({ length: 255, default: '' })
  name: string;
  @Column({ default: 0 })
  cancel_amount: number;
  @Column({ length: 255, default: '' })
  currency: string;
  @Column({ length: 255, default: '' })
  buyer_name: string;
  @Column({ length: 255, default: '' })
  buyer_email: string;
  @Column({ length: 255, default: '' })
  buyer_tel: string;
  @Column({ length: 255, default: '' })
  buyer_addr: string;
  @Column({ length: 255, default: '' })
  buyer_postcode: string;
  @Column({ type: 'text', default: '' })
  custom_data: string;
  @Column({ length: 255, default: '' })
  user_agent: string;
  @Column({ length: 255, default: '' })
  status: string;
  @Column({ default: 0 })
  started_at: number;
  @Column({ default: 0 })
  paid_at: number;
  @Column({ default: 0 })
  failed_at: number;
  @Column({ default: 0 })
  cancelled_at: number;
  @Column({ length: 255, default: '' })
  fail_reason: string;
  @Column({ length: 255, default: '' })
  cancel_reason: string;
  @Column({ length: 255, default: '' })
  receipt_url: string;
  @Column({ type: 'text', default: '' })
  cancel_history: string;
  @Column({ type: 'text', default: '' })
  cancel_receipt_urls: string;
  @Column({ length: 255, default: '' })
  cash_receipt_issued: string;
  @Column({ length: 255, default: '' })
  customer_uid: string;
  @Column({ length: 255, default: '' })
  customer_uid_usage: string;
  @Column({ type: 'text', default: '' })
  pg_data: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
