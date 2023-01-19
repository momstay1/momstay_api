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
import { EmailTmplEntity } from './email-tmpl.entity';

@Entity('email_history')
export class EmailHistoryEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ default: 2 })
  status: number;

  @Column()
  email: string;

  @Column({ type: 'text', default: '' })
  response: string;

  @ManyToOne(() => EmailTmplEntity, (emailTmpl) => emailTmpl.emailHistory, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  emailTmpl: EmailTmplEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
