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
  idx: number;

  @Column()
  status: number;

  @Column({ length: 255 })
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  type: string;

  @Column({ default: 10 })
  order: number;

  @Column({ default: 'root' })
  lists_auth: string;

  @Column({ default: 'root' })
  write_auth: string;

  @Column({ default: 'root' })
  view_auth: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => BoardContentsEntity, (bc) => bc.board)
  board_contents: undefined;

  @OneToMany(() => BoardCategoriesEntity, (bc) => bc.board)
  board_categories: undefined;
}
