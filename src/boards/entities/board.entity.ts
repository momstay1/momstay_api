import { BoardCategoriesEntity } from "src/board-categories/entities/board-categories.entity";
import { BoardContentsEntity } from "src/board-contents/entities/board-content.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity('boards')
export class BoardsEntity {
  @PrimaryGeneratedColumn()
  bd_idx: number;

  @Column()
  bd_status: number;

  @Column({ length: 255 })
  bd_id: string;

  @Column({ length: 255 })
  bd_name: string;

  @Column({ length: 255 })
  bd_type: string;

  @Column({ default: 10 })
  bd_order: number;

  @Column({ default: 'root' })
  bd_lists_auth: string;

  @Column({ default: 'root' })
  bd_write_auth: string;

  @Column({ default: 'root' })
  bd_view_auth: string;

  @CreateDateColumn()
  bd_createdAt: Date;

  @UpdateDateColumn()
  bd_updatedAt: Date;

  @OneToMany(() => BoardContentsEntity, (bc) => bc.board)
  board_contents: undefined;

  @OneToMany(() => BoardCategoriesEntity, (bc) => bc.board)
  board_categories: undefined;
}
