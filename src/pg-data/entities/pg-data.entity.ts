import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Entity } from "typeorm";

@Entity('pg_data')
export class PgDataEntity {
  @PrimaryGeneratedColumn()
  idx: number;
  @Column({ length: 255, default: '', nullable: true })
  productCode: string;
  @Column({ default: 0 })
  amount: number;
  @Column({ length: 255, default: '', nullable: true })
  imp_uid: string;
  @Column({ length: 255, default: '', nullable: true })
  merchant_uid: string;
  @Column({ length: 255, default: '', nullable: true })
  pay_method: string;
  @Column({ length: 255, default: '', nullable: true })
  channel: string;
  @Column({ length: 255, default: '', nullable: true })
  pg_provider: string;
  @Column({ length: 255, default: '', nullable: true })
  pg_tid: string;
  @Column({ length: 255, default: '', nullable: true })
  pg_id: string;
  @Column({ length: 255, default: '', nullable: true })
  escrow: string;
  @Column({ length: 255, default: '', nullable: true })
  apply_num: string;
  @Column({ length: 255, default: '', nullable: true })
  bank_code: string;
  @Column({ length: 255, default: '', nullable: true })
  bank_name: string;
  @Column({ length: 255, default: '', nullable: true })
  card_code: string;
  @Column({ length: 255, default: '', nullable: true })
  card_name: string;
  @Column({ default: 0 })
  card_quota: number;
  @Column({ default: 0 })
  card_number: string;
  @Column({ length: 255, default: '', nullable: true })
  card_type: string;
  @Column({ length: 255, default: '', nullable: true })
  vbank_code: string;
  @Column({ length: 255, default: '', nullable: true })
  vbank_name: string;
  @Column({ length: 255, default: '', nullable: true })
  vbank_num: string;
  @Column({ length: 255, default: '', nullable: true })
  vbank_holder: string;
  @Column({ default: 0 })
  vbank_date: number;
  @Column({ default: 0 })
  vbank_issued_at: number;
  @Column({ length: 255, default: '', nullable: true })
  name: string;
  @Column({ default: 0 })
  cancel_amount: number;
  @Column({ length: 255, default: '', nullable: true })
  currency: string;
  @Column({ length: 255, default: '', nullable: true })
  buyer_name: string;
  @Column({ length: 255, default: '', nullable: true })
  buyer_email: string;
  @Column({ length: 255, default: '', nullable: true })
  buyer_tel: string;
  @Column({ length: 255, default: '', nullable: true })
  buyer_addr: string;
  @Column({ length: 255, default: '', nullable: true })
  buyer_postcode: string;
  @Column({ type: 'text', default: '' })
  custom_data: string;
  @Column({ length: 255, default: '', nullable: true })
  user_agent: string;
  @Column({ length: 255, default: '', nullable: true })
  status: string;
  @Column({ default: 0 })
  started_at: number;
  @Column({ default: 0 })
  paid_at: number;
  @Column({ default: 0 })
  failed_at: number;
  @Column({ default: 0 })
  cancelled_at: number;
  @Column({ length: 255, default: '', nullable: true })
  fail_reason: string;
  @Column({ length: 255, default: '', nullable: true })
  cancel_reason: string;
  @Column({ length: 255, default: '', nullable: true })
  receipt_url: string;
  @Column({ type: 'text', default: '' })
  cancel_history: string;
  @Column({ type: 'text', default: '' })
  cancel_receipt_urls: string;
  @Column({ length: 255, default: '', nullable: true })
  cash_receipt_issued: string;
  @Column({ length: 255, default: '', nullable: true })
  customer_uid: string;
  @Column({ length: 255, default: '', nullable: true })
  customer_uid_usage: string;
  @Column({ type: 'text', default: '' })
  pg_data: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
