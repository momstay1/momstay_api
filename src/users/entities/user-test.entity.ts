import * as moment from 'moment';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users_test')
export class UsersTestEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  createdDate: Date;
  @Column()
  updatedDate: Date;
  @Column({ type: 'varchar' })
  createdDate1: Date;
  @Column({ type: 'varchar' })
  updatedDate1: Date;

}
