import { PlaceEntity } from "src/place/entities/place.entity";
import { UsersEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('defect')
export class DefectEntity {
  @PrimaryGeneratedColumn()
  dft_idx: number;

  @Column({ default: '' })
  dft_place_idx: string;
  @Column({ default: '' })
  dft_sort1: string;
  @Column({ default: '' })
  dft_sort2: string;
  @Column({ default: '' })
  dft_sort3: string;
  @Column({ default: '1' })
  dft_status: string;
  @Column({ default: '' })
  dft_type: string;
  @Column({ type: 'text' })
  dft_content: string;
  @Column({ default: '' })
  dft_work_method: string;
  @Column({ default: '' })
  dft_replacement_square_meter: string;
  @Column({ default: '' })
  dft_replacement_sheet: string;

  @Column()
  dft_shooting_day: string;

  @CreateDateColumn()
  dft_createdAt: Date;

  @UpdateDateColumn()
  dft_updatedAt: Date;

  @ManyToOne(() => PlaceEntity, (place) => place.defect, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  place: PlaceEntity;

  @ManyToOne(() => UsersEntity, (place) => place.defect, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  user: UsersEntity;
}
