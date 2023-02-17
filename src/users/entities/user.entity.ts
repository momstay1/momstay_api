import { BoardContentsEntity } from 'src/board-contents/entities/board-content.entity';
import { commonBcrypt } from 'src/common/common.bcrypt';
import { GroupsEntity } from 'src/groups/entities/group.entity';
import { LoginEntity } from 'src/login/entities/login.entity';
import { OrderProductEntity } from 'src/order-product/entities/order-product.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { ProductOptionEntity } from 'src/product-option/entities/product-option.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
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

  @Column({ type: 'date', default: '0' })
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

  @OneToMany(() => UserSnsEntity, (us) => us.user)
  userSns: undefined;

  @ManyToMany(() => GroupsEntity, (group) => group.users)
  @JoinTable()
  groups: GroupsEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'datetime', default: '0' })
  leaveAt: Date;
}
