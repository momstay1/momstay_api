import { UsersEntity } from "src/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { ReportCumulativeEntity } from "./report-cumulative.entity";

@Entity('report_content')
export class ReportContentEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ default: '', comment: '신고 그룹' })
  group: string;
  @Column({ type: 'text', default: '', comment: '신고 내용' })
  contentKor: string;
  @Column({ type: 'text', default: '', comment: '신고 내용' })
  contentEng: string;
  @Column({ type: 'text', default: '', comment: '신고 내용' })
  contentJpn: string;
  @Column({ type: 'text', default: '', comment: '신고 내용' })
  contentChn: string;

  @OneToMany(() => ReportCumulativeEntity, (recu) => recu.reportContent)
  reportCumulative: undefined;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

}
