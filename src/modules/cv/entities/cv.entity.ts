// src/cv/entities/cv.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Skill } from '../../skill/entities/skill.entity';
import { BaseEntity } from '../../../common/entities/baseEntity';

@Entity()
export class Cv extends BaseEntity {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  name: string;

  @Column()
  firstname: string;

  @Column()
  age: number;

  @Column()
  cin: number;

  @Column()
  job: string;

  @Column({ nullable: true })
  path: string;

  @ManyToOne(() => User, (user) => user.cvs, { onDelete: 'CASCADE' })
  // ()=>User ma3neha cette relation pointe vers la classe User
  // el thania hiya el inverse de la relation
  //ki tfal el cv el user tfas5ou zeda
  user: User;

  @ManyToMany(() => Skill, { cascade: true })
  //hna cv aandha effet ala skills associés
  @JoinTable()
  //a3mali table intermédiaire
  //👉 Le décorateur @JoinTable() ne doit être utilisé que sur UN des deux côtés de la relation ManyToMany.
  skills: Skill[];
}
