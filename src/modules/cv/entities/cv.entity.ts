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
  user: User;

  @ManyToMany(() => Skill, { cascade: true })
  @JoinTable()
  skills: Skill[];
}
