import { BlockEntity } from 'src/block/entities/block.entity';
import { BoardContentsEntity } from 'src/board-contents/entities/board-content.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { commonBcrypt } from 'src/common/common.bcrypt';
import { DeviceEntity } from 'src/device/entities/device.entity';
import { GroupsEntity } from 'src/groups/entities/group.entity';
import { LoginEntity } from 'src/login/entities/login.entity';
import { MembershipHistoryEntity } from 'src/membership/entities/membership-history.entity';
import { OrderProductEntity } from 'src/order-product/entities/order-product.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { ProductOptionEntity } from 'src/product-option/entities/product-option.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { ReportCumulativeEntity } from 'src/report-cumulative/entities/report-cumulative.entity';
import { ReservationEntity } from 'src/reservation/entities/reservation.entity';
import { ReviewEntity } from 'src/reviews/entities/review.entity';
import { UserSnsEntity } from 'src/user-sns/entities/user-sns.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ default: 2 })
  status: number;

  @Column({ default: 'default' })
  type: string;

  @Column({ length: 255 })
  id: string;

  @Column({ length: 255 })
  password: string;

  @BeforeInsert()
  async setPassword(password: string) {
    if (this.password) {
      this.password = await commonBcrypt.setBcryptPassword(password || this.password);
    }
  }

  @Column({ length: 255 })
  prevPassword: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, default: '' })
  email: string;

  @Column({ length: 255, default: '' })
  language: string;

  @Column({ length: 255, default: '' })
  gender: string;

  @Column({ length: 255, default: '' })
  countryCode: string;

  @Column({ length: 255, default: '' })
  phone: string;

  @Column({ type: 'date', default: '0', nullable: true })
  birthday: Date | string;

  @Column({ length: 255, default: '' })
  other: string;

  @Column({ type: 'text', default: '' })
  memo: string;

  @Column({ length: 255, default: '' })
  signupVerifyToken: string;

  @Column({ length: 255, default: '' })
  uniqueKey: string;

  @Column({ type: 'text', default: '' })
  certifiInfo: string;

  @Column({ default: '1' })
  marketing: string;

  @Column({ default: '' })
  oldIdx: string;
  @Column({ type: 'text', default: '' })
  oldData: string;

  @OneToMany(() => BoardContentsEntity, (bc) => bc.user)
  boardContents: undefined;

  @OneToMany(() => ProductEntity, (pr) => pr.user)
  product: undefined;

  @OneToMany(() => OrderEntity, (order) => order.user)
  order: undefined;
  @OneToMany(() => OrderProductEntity, (op) => op.user)
  orderProduct: undefined;

  @OneToMany(() => LoginEntity, (login) => login.user)
  login: undefined;

  @OneToMany(() => ReservationEntity, (rev) => rev.user)
  reservation: undefined;

  @OneToMany(() => UserSnsEntity, (us) => us.user)
  userSns: undefined;

  @OneToMany(() => ReviewEntity, (review) => review.user)
  review: undefined;

  @OneToMany(() => MembershipHistoryEntity, (mh) => mh.user)
  membershipHistory: undefined;

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comment: undefined;

  @OneToMany(() => BlockEntity, (block) => block.user)
  block: BlockEntity[];
  @OneToMany(() => ReportCumulativeEntity, (rc) => rc.user)
  reportCumulative: undefined;

  @OneToOne(() => DeviceEntity, { cascade: true })
  @JoinColumn()
  device: DeviceEntity;

  @ManyToOne(() => GroupsEntity, (group) => group.users)
  group: GroupsEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'date', default: '0', nullable: true, comment: '마지막 활동 날짜' })
  activitedAt: Date;
  @Column({ type: 'datetime', default: '0', comment: '탈퇴 처리한 날짜' })
  leaveAt: Date;
}
