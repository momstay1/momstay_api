import { commonBcrypt } from "src/common/common.bcrypt";
import { UsersEntity } from "src/users/entities/user.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ default: 2, comment: '댓글 상태 (1: 삭제, 2: 등록)' })
  status: number;
  @Column({ default: 0, comment: '댓글인 경우 기본값 0, 대댓글시 사용하며 부모 댓글 idx 값 입력' })
  parentIdx: number;
  @Column({ default: '', comment: '게시판: bc (추후 주문, 회원, 기타 등등 추가 될 예정)' })
  category: string;
  @Column({ default: 0, comment: '댓글을 참조할 데이터 idx (게시판 댓글인 경우 게시글의 idx)' })
  foreignIdx: number;
  @Column({ type: 'text', default: '', comment: '댓글 내용' })
  contents: string;
  @Column({ default: '', comment: '작성자 명' })
  name: string;
  @BeforeInsert()
  async setPassword(password: string) {
    if (this.password) {
      this.password = await commonBcrypt.setBcryptPassword(password || this.password);
    }
  }
  @Column({ default: '', comment: '댓글 비밀번호 (비회원 작성시에 필요)' })
  password: string;
  @Column({ default: '', comment: '권한 (사용X)' })
  author: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UsersEntity, (user) => user.review, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  user: UsersEntity;

}
