import { UsersEntity } from "src/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity('block')
export class BlockEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ default: 0, comment: '차단한 회원 idx' })
  blockUserIdx: number;

  @ManyToOne(() => UsersEntity, (user) => user.block)
  user: UsersEntity;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
