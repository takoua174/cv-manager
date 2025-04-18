// src/user/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import { Cv } from '../../cv/entities/cv.entity';
import { BaseEntity } from '../../../common/entities/baseEntity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Cv, (cv) => cv.user)
  cvs: Cv[];

  @Column()
  salt: string;

  @Column({ default: 'user' })
  role: string; // 'user' or 'admin'

  @BeforeInsert()
  async hashPassword() {
    const salt = await require('bcrypt').genSalt();
    this.password = await require('bcrypt').hash(this.password, salt);
    this.salt = salt;
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await require('bcrypt').hash(password, this.salt);
    return hash === this.password;
  }
}
