import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm';
import Subject from './Subject';

@Entity()
export default class Teacher {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    length: 100,
    nullable: false
  })
  name: string;

  @Column({
    nullable: false
  })
  institution: string;

  @Column({
    nullable: false
  })
  age: number;

  @Column({
    length: 100,
    nullable: false,
    unique: true
  })
  email: string;

  @Column({
    nullable: false
  })
  password: string;

  @CreateDateColumn()
  created_At: Date;

  @UpdateDateColumn()
  updated_At: Date;

  @ManyToOne(() => Subject, subject => subject.teachers)
  subject: Subject;
}
