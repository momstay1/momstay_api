import { BoardCategoriesEntity } from 'src/board-categories/entities/board-categories.entity';
import { BoardContentsEntity } from 'src/board-contents/entities/board-content.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('board_selected_categories')
export class BoardSelectedCategoriesEntity {
  @PrimaryGeneratedColumn()
  bscat_idx: number;

  @Column()
  bscat_bcat_idx: number;

  @Column()
  bscat_bc_idx: number;

  @Column({ default: 10 })
  bscat_order: number;

  @ManyToOne(
    () => BoardCategoriesEntity,
    (bcat) => bcat.bscats,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    },
  )
  bcats: BoardCategoriesEntity;

  @ManyToOne(
    () => BoardContentsEntity,
    (bc) => bc.bscats,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    },
  )
  bc: undefined;
}
