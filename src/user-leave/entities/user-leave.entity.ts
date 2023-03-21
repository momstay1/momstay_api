import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users_leave')
export class UserLeaveEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ length: 255, default: '', comment: '탈퇴한 회원 id' })
  id: string;
  @Column({ type: 'text', comment: '탈퇴한 회원 사유' })
  reason: string;
  @Column({ type: 'text', comment: '회원 정보' })
  userInfo: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
