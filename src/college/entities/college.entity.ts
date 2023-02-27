import { ProductEntity } from "src/product/entities/product.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity('college')
export class CollegeEntity {
  @PrimaryGeneratedColumn()
  idx: number;
  @Column({ default: '' })
  nameKor: string;
  @Column({ default: '' })
  nameEng: string;
  @Column({ default: '' })
  nameJpn: string;
  @Column({ default: '' })
  nameChn: string;

  @ManyToMany(() => ProductEntity, (product) => product.college)
  product: undefined;
}

