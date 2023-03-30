import { ProductOptionEntity } from "src/product-option/entities/product-option.entity";
import { UsersEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('reservation')
export class ReservationEntity {
  @PrimaryGeneratedColumn()
  idx: number;
  @Column({ default: 1, comment: '방문예약 상태 (1: 예약대기, 2: 예약승인, 4: 예약취소, 5: 예약거부)' })
  status: number;
  @Column({ type: 'date', default: '0', nullable: true, comment: '방문날짜' })
  visitDate: Date | string;
  @Column({ type: 'time', default: '0', comment: '방문시간' })
  visitTime: Date | string;
  @Column({ type: 'date', default: '0', nullable: true, comment: '입주날짜' })
  occupancyAt: Date | string;
  @Column({ type: 'date', default: '0', nullable: true, comment: '퇴거날짜' })
  evictionAt: Date | string;
  @Column({ type: 'text', default: '', comment: '메세지' })
  memo: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ProductOptionEntity, (po) => po.reservation, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  productOption: ProductOptionEntity;
  @ManyToOne(() => UsersEntity, (user) => user.reservation, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  user: UsersEntity;
}
