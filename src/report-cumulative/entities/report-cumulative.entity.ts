import { UsersEntity } from "src/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { ReportContentEntity } from "./report-content.entity";

@Entity('report_cumulative')
export class ReportCumulativeEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ default: '', comment: '신고 연관된 테이블 정보' })
  category: string;
  @Column({ default: 0, comment: '신고 연관된 테이블의 idx' })
  foreignIdx: number;

  @ManyToOne(() => ReportContentEntity, (recon) => recon.reportCumulative)
  reportContent: ReportContentEntity;
  @ManyToOne(() => UsersEntity, (user) => user.reportCumulative)
  user: UsersEntity;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

}
