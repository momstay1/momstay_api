import { BoardContentsEntity } from 'src/board-contents/entities/board-content.entity';
import { commonBcrypt } from 'src/common/common.bcrypt';
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

@Entity('admin_users')
export class AdminUsersEntity {
  @PrimaryGeneratedColumn()
  admin_idx: number;

  @Column({ default: 2 })
  admin_status: number;

  @Column({ default: 'default' })
  admin_type: string;

  @Column({ length: 30 })
  admin_id: string;

  @Column({ length: 30 })
  admin_name: string;

  @Column({ length: 60 })
  admin_email: string;

  @Column({ length: 60 })
  user_phone: string;

  @Column({ length: 255 })
  admin_password: string;

  @BeforeInsert()
  async setPassword(password: string) {
    this.admin_password = await commonBcrypt.setBcryptPassword(password || this.admin_password);
  }

  @Column({ type: 'text' })
  admin_memo: string;

  @OneToMany(() => BoardContentsEntity, (bc) => bc.admin)
  board_contents: undefined;

  @ManyToOne(() => GroupsEntity, (group) => group.grp_users, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  admin_group: GroupsEntity;

  @CreateDateColumn()
  admin_createdAt: Date;

  @UpdateDateColumn()
  admin_updatedAt: Date;
}
