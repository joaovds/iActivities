import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany} from 'typeorm';
import Student from './Student';
import Subject from './Subject';
import Response from './Response';

@Entity('post')
export default class Post {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    length: 100
  })
  title: string;

  @Column({
    nullable: false
  })
  description: string;

  @CreateDateColumn()
  created_At: Date;

  @UpdateDateColumn()
  updated_At: Date;

  @ManyToOne(() => Student, student => student.posts)
  student: Student;

  @ManyToOne(() => Subject, subject => subject.posts)
  subject: Subject;

  @OneToMany(() => Response, responses => responses.post)
  responses: Response[];
}
