import { AdminUsersEntity } from "src/admin-users/entities/admin-user.entity";
import { UsersEntity } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('groups')
export class GroupsEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ length: 30 })
  type: string;

  @Column()
  status: string;

  @Column({ length: 30 })
  id: string;

  @Column({ length: 30 })
  name: string;

  @Column({ type: 'text' })
  memo: string;

  @ManyToMany(
    () => UsersEntity,
    (user) => user.groups,
  )
  users: UsersEntity[];
}
