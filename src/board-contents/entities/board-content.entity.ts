import { ApiProperty } from '@nestjs/swagger';
import { AdminUsersEntity } from 'src/admin-users/entities/admin-user.entity';
import { BoardSelectedCategoriesEntity } from 'src/board-selected-categories/entities/board-selected-categories.entity';
import { BoardsEntity } from 'src/boards/entities/board.entity';
import { commonBcrypt } from 'src/common/common.bcrypt';
import { UsersEntity } from 'src/users/entities/user.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('board_contents')
export class BoardContentsEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '게시글 idx' })
  bc_idx: number;

  @Column()
  @ApiProperty({ description: '게시판 idx' })
  bc_bd_idx: number;

  @Column({ default: 0 })
  @ApiProperty({ description: '게시글 작성한 회원 idx' })
  bc_user_idx: number;

  @Column({ default: 2 })
  @ApiProperty({ description: '게시글 상태 0: 삭제, 1:미등록 2: 등록' })
  bc_status: number;

  @Column({ default: 2 })
  @ApiProperty({ description: '게시글 타입 1: 공지사항, 2: 일반글, 3: 비밀글, 4: 외부링크' })
  bc_type: number;

  @Column()
  @ApiProperty({ description: '게시글 작성자' })
  bc_write_name: string;

  @Column({ length: 255 })
  @ApiProperty({ description: '게시글 제목' })
  bc_title: string;

  @Column({ length: 255, default: '' })
  @ApiProperty({ description: '게시글 링크' })
  bc_link: string;

  @Column({ type: 'text' })
  @ApiProperty({ description: '게시글 내용' })
  bc_content: string;

  @Column({ length: 255, default: '' })
  bc_password: string;

  @BeforeInsert()
  async setPassword(password: string) {
    this.bc_password = await commonBcrypt.setBcryptPassword(password || this.bc_password);
  }

  @Column({ default: 0 })
  @ApiProperty({ description: '게시글 조회수' })
  bc_count: number;

  @Column({ default: 10 })
  @ApiProperty({ description: '게시글 순서' })
  bc_order: number;

  @CreateDateColumn()
  @ApiProperty({ description: '게시글 생성일' })
  bc_createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: '게시글 수정일' })
  bc_updatedAt: Date;

  @ManyToOne(() => UsersEntity, (user) => user.board_contents, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  user: UsersEntity;

  @ManyToOne(() => UsersEntity, (admin) => admin.board_contents, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  admin: AdminUsersEntity;

  @ManyToOne(() => BoardsEntity, (board) => board.board_contents, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  board: BoardsEntity;

  @OneToMany(
    () => BoardSelectedCategoriesEntity,
    (bscat) => bscat.bc,
  )
  bscats: BoardSelectedCategoriesEntity;
}
