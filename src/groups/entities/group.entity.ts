import { AdminUsersEntity } from "src/admin-users/entities/admin-user.entity";
import { UsersEntity } from "src/users/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('groups')
export class GroupsEntity {
  @PrimaryGeneratedColumn()
  grp_idx: number;

  @Column({ length: 30 })
  grp_type: string;

  @Column()
  grp_status: string;

  @Column({ length: 30 })
  grp_id: string;

  @Column({ length: 30 })
  grp_name: string;

  @Column({ type: 'text' })
  grp_memo: string;

  @OneToMany(
    () => UsersEntity,
    (user) => user.user_group,
  )
  grp_users: undefined;

  @OneToMany(
    () => AdminUsersEntity,
    (grp_admin) => grp_admin.admin_group,
  )
  grp_admin: undefined;
}
