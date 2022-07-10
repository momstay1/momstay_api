import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('place')
export class PlaceEntity {
  @PrimaryGeneratedColumn()
  place_idx: number;

  @Column({ default: 1 })
  place_status: number;

  @Column({ default: '' })
  place_type: string;

  @Column({ default: '' })
  place_name: string;

  @Column({ default: '' })
  place_addr: string;

  @Column({ type: 'text' })
  place_memo: string;

  @CreateDateColumn()
  place_createdAt: Date;

  @UpdateDateColumn()
  place_updatedAt: Date;
}
