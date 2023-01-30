import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('refresh_token')
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn()
  idx: number;
  @Column({ default: '' })
  token: string;
  @Column({ default: '' })
  user_idx: string;
  @Column({ type: 'datetime', default: '0' })
  expriedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
