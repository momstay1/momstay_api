import { ProductInfoEntity } from "src/product-info/entities/product-info.entity";
import { ProductOptionEntity } from "src/product-option/entities/product-option.entity";
import { UsersEntity } from "src/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ default: 2 })
  status: number;
  @Column({ default: '' })
  type: string;
  @Column({ default: '' })
  code: string;
  @Column({ default: '' })
  order: string;

  // 숙소 기본정보 (회원 정보)
  @Column({ default: '' })
  membership: string;
  @Column({ default: '' })
  hostBusiness: string; // 사업자 구분

  // 숙소 정보
  @Column({ default: '' })
  title: string;
  @Column({ default: '' })
  titleEng: string;
  @Column({ default: '' })
  titleJpn: string;
  @Column({ default: '' })
  titleChn: string;
  @Column({ default: '' })
  postCode: string;
  @Column({ default: '' })
  addr1: string;
  @Column({ default: '' })
  addr2: string;
  @Column({ default: '' })
  addr1Eng: string;
  @Column({ default: '' })
  addr2Eng: string;
  @Column({ default: '' })
  addr1Jpn: string;
  @Column({ default: '' })
  addr2Jpn: string;
  @Column({ default: '' })
  addr1Chn: string;
  @Column({ default: '' })
  addr2Chn: string;
  @Column({ default: '' })
  lat: string;            // 위도
  @Column({ default: '' })
  lng: string;            // 경도
  @Column({ default: '' })
  language: string;
  @Column({ default: '' })
  metro: string;
  @Column({ default: '' })
  college: string;
  @Column({ default: '' })
  metroEng: string;
  @Column({ default: '' })
  collegeEng: string;
  @Column({ default: '' })
  metroJpn: string;
  @Column({ default: '' })
  collegeJpn: string;
  @Column({ default: '' })
  metroChn: string;
  @Column({ default: '' })
  collegeChn: string;
  @Column({ type: 'text', default: '' })
  detailsKor: string;
  @Column({ type: 'text', default: '' })
  detailsEng: string;
  @Column({ type: 'text', default: '' })
  detailsJpn: string;
  @Column({ type: 'text', default: '' })
  detailsChn: string;
  @Column({ default: 0, })
  oldIdx: number;
  @Column({ type: 'text', default: '' })
  oldData: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UsersEntity, (user) => user.product, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  user: UsersEntity;

  @OneToMany(() => ProductOptionEntity, (po) => po.product)
  productOption: undefined;

  @ManyToMany(() => ProductInfoEntity, (pi) => pi.product)
  productInfo: ProductInfoEntity[];
}
