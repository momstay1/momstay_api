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
  idx: number;

  @Column({ default: 2 })
  @ApiProperty({ description: '게시글 상태 0: 삭제, 1:미등록 2: 등록' })
  status: number;

  @Column({ default: 2 })
  @ApiProperty({ description: '게시글 타입 1: 공지사항, 2: 일반글, 3: 비밀글(미사용), 4: 외부링크, 5: 이벤트, 6: 새소식' })
  type: number;

  @Column()
  @ApiProperty({ description: '게시글 작성자' })
  writer: string;

  @Column({ length: 255 })
  @ApiProperty({ description: '게시글 제목' })
  title: string;

  @Column({ length: 255, default: '' })
  @ApiProperty({ description: '게시글 링크 사용여부' })
  linkStatus: string;

  @Column({ length: 255, default: '' })
  @ApiProperty({ description: '게시글 링크' })
  link: string;

  @Column({ type: 'text' })
  @ApiProperty({ description: '게시글 내용' })
  content: string;

  @Column({ length: 255, default: '' })
  password: string;

  @BeforeInsert()
  async setPassword(password: string) {
    if (this.password) {
      this.password = await commonBcrypt.setBcryptPassword(password || this.password);
    }
  }

  @Column({ default: 0 })
  @ApiProperty({ description: '게시글 조회수' })
  count: number;

  @Column({ default: 10 })
  @ApiProperty({ description: '게시글 순서' })
  order: number;

  @CreateDateColumn()
  @ApiProperty({ description: '게시글 생성일' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: '게시글 수정일' })
  updatedAt: Date;

  @ManyToOne(() => UsersEntity, (user) => user.boardContents, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  user: UsersEntity;

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
