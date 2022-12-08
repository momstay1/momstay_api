import { UsersEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('login')
export class LoginEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ length: 255, default: '' })
  ip: string;

  @Column({ type: 'text', default: '' })
  agent: string;

  @ManyToOne(() => UsersEntity, (user) => user.login, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  user: UsersEntity;

  @CreateDateColumn()
  createdAt: Date;
}
