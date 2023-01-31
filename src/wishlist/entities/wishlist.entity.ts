import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('wishlist')
export class WishlistEntity {
  @PrimaryGeneratedColumn()
  idx: number;
  @Column()
  user_idx: number;
  @Column()
  product_idx: number;
}
