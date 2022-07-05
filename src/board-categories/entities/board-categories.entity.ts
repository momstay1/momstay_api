import { BoardSelectedCategoriesEntity } from 'src/board-selected-categories/entities/board-selected-categories.entity';
import { BoardsEntity } from 'src/boards/entities/board.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('board_categories')
export class BoardCategoriesEntity {
  @PrimaryGeneratedColumn()
  bcat_idx: number;

  @Column({ length: 255 })
  bcat_id: string;

  @Column()
  bcat_bd_idx: number;

  @Column({ default: 1 })
  bcat_status: number;

  @Column({ length: 255 })
  bcat_title: string;

  @Column({ type: 'text' })
  bcat_content: string;

  @CreateDateColumn()
  bcat_createdAt: Date;

  @UpdateDateColumn()
  bcat_updatedAt: Date;

  @ManyToOne(
    () => BoardsEntity,
    (board) => board.board_categories,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    },
  )
  board: BoardsEntity;

  @OneToMany(
    () => BoardSelectedCategoriesEntity,
    (bscat) => bscat.bcats,
  )
  bscats: undefined;
}
