import { ProductEntity } from "src/product/entities/product.entity";
import { UsersEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('membership_history')
export class MembershipHistoryEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ default: '0', comment: '상태값 (1: 신청, 2: 승인, 3: 종료)' })
  status: number;
  @Column({ length: 255, default: '', comment: '입금자 명' })
  depositor: string;
  @Column({ default: '0', comment: '멤버십 기간 (1: 1개월, 3: 3개월 ...)' })
  month: number;
  @Column({ type: 'date', default: '0', nullable: true, comment: '멤버십 시작일' })
  start: string;
  @Column({ type: 'date', default: '0', nullable: true, comment: '멤버십 종료일' })
  end: string;


  @ManyToOne(() => UsersEntity, (user) => user.membershipHistory, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  user: UsersEntity;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
