// src/skill/entities/skill.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from 'src/common/entities/baseEntity';

@Entity()
export class Skill extends BaseEntity {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  designation: string;
}
