import { ProductEntity } from "src/product/entities/product.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('product_info')
export class ProductInfoEntity {
  @PrimaryGeneratedColumn()
  idx: number;
  @Column({ default: 2 })
  status: number;
  @Column({ default: '' })
  type: string;
  @Column({ default: '' })
  name: string;

  @ManyToMany(() => ProductEntity, (product) => product.productInfo)
  product: ProductEntity[];
}
