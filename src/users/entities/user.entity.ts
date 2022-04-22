import { BoardContentsEntity } from 'src/board-contents/entities/board-content.entity';
import { commonBcrypt } from 'src/common/common-bcrypt';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  user_idx: number;

  @Column({ default: 1 })
  user_status: number;

  @Column({ default: 'default' })
  user_type: string;

  @Column({ length: 30 })
  user_id: string;

  @Column({ length: 30 })
  user_name: string;

  @Column({ length: 60 })
  user_email: string;

  @Column({ length: 255 })
  user_password: string;

  @BeforeInsert()
  async setPassword(password: string) {
    this.user_password = await commonBcrypt.setBcryptPassword(password || this.user_password);
  }

  @Column({ length: 60 })
  user_signupVerifyToken: string;

  @OneToMany(() => BoardContentsEntity, (bc) => bc.user)
  board_contents: undefined;

  @CreateDateColumn()
  user_createdAt: Date;

  @UpdateDateColumn()
  user_updatedAt: Date;
}
