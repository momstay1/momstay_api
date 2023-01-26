import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('metro')
export class MetroEntity {
  @PrimaryGeneratedColumn()
  idx: number;
  @Column({ default: '' })
  line: string;
  @Column({ default: '' })
  stationKor: string;
  @Column({ default: '' })
  stationEng: string;
  @Column({ default: '' })
  stationJpn: string;
  @Column({ default: '' })
  stationChn: string;
}
