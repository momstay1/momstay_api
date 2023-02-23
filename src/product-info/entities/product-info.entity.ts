import { ProductOptionEntity } from "src/product-option/entities/product-option.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('product_info')
export class ProductInfoEntity {
  @PrimaryGeneratedColumn()
  idx: number;
  @Column({ default: 2 })
  status: number;
  @Column({ default: '' })
  group: string;
  @Column({ default: '' })
  type: string;
  @Column({ default: '' })
  typeEng: string;
  @Column({ default: '' })
  typeJpn: string;
  @Column({ default: '' })
  typeChn: string;
  @Column({ default: '' })
  name: string;
  @Column({ default: '' })
  nameEng: string;
  @Column({ default: '' })
  nameJpn: string;
  @Column({ default: '' })
  nameChn: string;

  @ManyToMany(() => ProductEntity, (product) => product.productInfo)
  @JoinTable()
  product: ProductEntity[];

  @ManyToMany(() => ProductOptionEntity, (product) => product.productInfo)
  @JoinTable()
  productOption: ProductOptionEntity[];
}
