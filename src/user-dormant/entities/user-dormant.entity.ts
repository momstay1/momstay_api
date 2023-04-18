export class UserDormant { }
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users_dormant')
export class UserDormantEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ length: 255, default: '', comment: '회원 id' })
  id: string;
  @Column({ type: 'text', comment: '회원 정보' })
  userInfo: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
