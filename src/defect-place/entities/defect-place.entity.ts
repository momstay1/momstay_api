import { PlaceEntity } from "src/place/entities/place.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('defect_place')
export class DefectPlaceEntity {
  @PrimaryGeneratedColumn()
  dfp_idx: number;

  @Column({ default: '' })
  dfp_sort1: string;

  @Column({ default: '' })
  dfp_sort2: string;

  @Column({ type: 'text' })
  dfp_sort3: string;

  @Column({ default: '' })
  dfp_place_idx: string;

  @ManyToOne(() => PlaceEntity, (place) => place.defect_place, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  place: PlaceEntity;
}
