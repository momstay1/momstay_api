import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('settings')
export class SettingEntity {
  @PrimaryColumn({ length: 100 })
  set_key: string;

  @Column({ type: 'text' })
  set_value: string;
}
