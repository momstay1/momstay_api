import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('popup')
export class PopupEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '팝업 idx' })
  idx: number;

  @Column({ default: 2, comment: '상태 (1: 삭제, 2: 등록)' })
  @ApiProperty({ description: '팝업 사용여부' })
  status: number;

  @Column({
    default: '',
    comment: '팝업 아이디 (사용자단에서 팝업 호출 시 사용)',
  })
  @ApiProperty({ description: '팝업 id' })
  id: string;

  @Column({ default: '', comment: '팝업명' })
  @ApiProperty({ description: '팝업명' })
  title: string;

  @Column({ default: '', comment: '노출 페이지' })
  @ApiProperty({ description: '노출 페이지' })
  page: string;

  @Column({ type: 'date', default: '0', nullable: true, comment: '팝업 노출 시작일' })
  @ApiProperty({ description: '팝업 노출 시작일' })
  startPeriod: Date | string;

  @Column({ type: 'date', default: '0', nullable: true, comment: '팝업 노출 종료일' })
  @ApiProperty({ description: '팝업 노출 종료일' })
  endPeriod: Date | string;

  @Column({ default: 10, comment: '팝업 노출 순위' })
  @ApiProperty({ description: '팝업 노출 순위' })
  order: number;

  @Column({ default: '', comment: '팝업 링크' })
  @ApiProperty({ description: '팝업 링크' })
  link: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
