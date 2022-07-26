import { BoardContentsEntity } from 'src/board-contents/entities/board-content.entity';
import { commonBcrypt } from 'src/common/common.bcrypt';
import { DefectEntity } from 'src/defect/entities/defect.entity';
import { GroupsEntity } from 'src/groups/entities/group.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  user_idx: number;

  @Column({ default: 2 })
  user_status: number;

  @Column({ default: 'default' })
  user_type: string;

  @Column({ length: 30 })
  user_id: string;

  @Column({ length: 30 })
  user_name: string;

  @Column({ length: 60 })
  user_email: string;

  @Column({ length: 60 })
  user_phone: string;

  @Column({ length: 255 })
  user_password: string;

  @BeforeInsert()
  async setPassword(password: string) {
    this.user_password = await commonBcrypt.setBcryptPassword(password || this.user_password);
  }

  @Column({ type: 'text' })
  user_memo: string;

  @Column({ length: 60, default: '' })
  user_signupVerifyToken: string;

  @Column()
  user_place_idx: number;

  @OneToMany(() => BoardContentsEntity, (bc) => bc.user)
  board_contents: undefined;

  @OneToMany(() => DefectEntity, (dft) => dft.user)
  defect: undefined;

  @ManyToOne(() => GroupsEntity, (group) => group.grp_users, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  user_group: GroupsEntity;

  @CreateDateColumn()
  user_createdAt: Date;

  @UpdateDateColumn()
  user_updatedAt: Date;
}
