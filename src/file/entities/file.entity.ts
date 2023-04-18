import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('file')
export class FileEntity {
  @PrimaryGeneratedColumn()
  file_idx: number;

  @Column({ default: '' })
  file_category: string;
  @Column({ default: '-1' })
  file_foreign_idx: string;
  @Column({ default: '' })
  file_name: string;
  @Column({ default: '' })
  file_type: string;
  @Column({ default: '' })
  file_path: string;
  @Column({ default: '' })
  file_full_path: string;
  @Column({ default: '', comment: '이미지 스토리지 서버 경로' })
  file_storage_path: string;
  @Column({ default: '', comment: '워터마크 추가된 이미지 스토리지 서버 경로' })
  file_watermark_storage_path: string;
  @Column({ default: '', comment: '워터마크 추가된 이미지 경로' })
  file_watermark_path: string;
  @Column({ default: '' })
  file_html_path: string;
  @Column({ default: '' })
  file_html_full_path: string;
  @Column({ default: '' })
  file_html_thumb_path: string;
  @Column({ default: '', comment: '랜덤 처리된 이미지 이름' })
  file_raw_name: string;
  @Column({ default: '', comment: '워터마크 추가된 이미지 이름' })
  file_watermark_name: string;
  @Column({ default: '' })
  file_orig_name: string;
  @Column({ default: '' })
  file_client_name: string;
  @Column({ default: '' })
  file_ext: string;
  @Column({ default: '' })
  file_size: string;
  @Column({ default: '' })
  file_is_img: string;
  @Column({ default: '' })
  file_image_width: string;
  @Column({ default: '' })
  file_image_height: string;
  @Column({ default: '' })
  file_image_type: string;
  @Column({ default: '' })
  file_image_size_str: string;
  @Column({ default: '' })
  file_order: string;

  @CreateDateColumn()
  file_createdAt: Date;

  @UpdateDateColumn()
  file_updatedAt: Date;
}
