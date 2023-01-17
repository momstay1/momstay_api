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

  @Column({ default: '' })
  stayStatus: string;
  @Column({ default: '' })
  visitStatus: string;
  @Column({ default: '' })
  paymentStatus: string;

  @Column({ default: '' })
  title: string;
  @Column({ type: 'text', default: '' })
  detailsKor: string;
  @Column({ type: 'text', default: '' })
  detailsEng: string;
  @Column({ type: 'text', default: '' })
  detailsJpn: string;
  @Column({ type: 'text', default: '' })
  detailsChn: string;

  @Column({ default: '' })
  privateFacility: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UsersEntity, (user) => user.productOption, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  user: UsersEntity;
}
