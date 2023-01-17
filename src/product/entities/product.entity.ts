import { ProductInfoEntity } from "src/product-info/entities/product-info.entity";
import { UsersEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ default: 2 })
  status: number;
  @Column({ default: '' })
  type: string;
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
  postCode: string;
  @Column({ default: '' })
  addr1: string;
  @Column({ default: '' })
  addr2: string;
  @Column({ default: '' })
  language: string;
  @Column({ default: '' })
  metro: string;
  @Column({ default: '' })
  college: string;
  @Column({ type: 'text', default: '' })
  detailsKor: string;
  @Column({ type: 'text', default: '' })
  detailsEng: string;
  @Column({ type: 'text', default: '' })
  detailsJpn: string;
  @Column({ type: 'text', default: '' })
  detailsChn: string;


  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UsersEntity, (user) => user.product, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  user: UsersEntity;

  @ManyToMany(() => ProductInfoEntity, (pi) => pi.product)
  @JoinTable()
  productInfo: ProductInfoEntity[];
}
