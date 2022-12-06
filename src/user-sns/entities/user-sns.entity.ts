import { UsersEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_sns')
export class UserSnsEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  id: string;

  @Column({ default: 1 })
  status: number;

  @Column({ default: 'default' })
  type: string;

  @Column({ type: 'text', default: '' })
  info: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UsersEntity, (user) => user.userSns, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  user: UsersEntity;
}
