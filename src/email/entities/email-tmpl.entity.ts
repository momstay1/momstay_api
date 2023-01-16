import { BoardContentsEntity } from 'src/board-contents/entities/board-content.entity';
import { commonBcrypt } from 'src/common/common.bcrypt';
import { GroupsEntity } from 'src/groups/entities/group.entity';
import { LoginEntity } from 'src/login/entities/login.entity';
import { UserSnsEntity } from 'src/user-sns/entities/user-sns.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EmailHistoryEntity } from './email-history.entity';

@Entity('email_tmpl')
export class EmailTmplEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ default: 2 })
  status: number;

  @Column({ default: 'main' })
  type: string;

  @Column({ length: 255 })
  id: string;

  @Column({ type: 'text', default: '' })
  template: string;

  @OneToMany(() => EmailHistoryEntity, (emailHistory) => emailHistory.emailTmpl)
  emailHistory: undefined;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
