import { UsersEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('device')
export class DeviceEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ length: 255, default: '', comment: '단말기 토큰' })
  token: string
  @Column({ length: 255, default: '', comment: '접속중인 앱 버전' })
  appVersion: string
  @Column({ length: 255, default: '', comment: '단말기 운영체제' })
  os: string
  @Column({ length: 255, default: '', comment: '단말기 운영체제 버전' })
  osVersion: string
  @Column({ length: 255, default: '', comment: '접속 환경 (app, web)' })
  environment: string
  @Column({ length: 255, default: '2', comment: '일반 알림 수신 정보 동의 여부 (1: 비동의, 2: 동의)' })
  notification: string
  @Column({ length: 255, default: '2', comment: '마케팅 알림 수신 정보 동의 여부 (1: 비동의, 2: 동의)' })
  marketing: string
  @Column({ length: 255, default: '2', comment: '서비스 알림 수신 정보 동의 여부 (1: 비동의, 2: 동의)' })
  service: string
  @Column({ type: 'datetime', default: '0', comment: '일반 알림 동의 여부 수정된 날짜' })
  notificationAt: Date | string;
  @Column({ type: 'datetime', default: '0', comment: '마케팅 동의 여부 수정된 날짜' })
  marketingAt: Date | string;
  @Column({ type: 'datetime', default: '0', comment: '서비스 동의 여부 수정된 날짜' })
  serviceAt: Date | string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => UsersEntity, (user) => user.device)
  user: UsersEntity | undefined;
}
