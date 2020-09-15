import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany} from 'typeorm';
import Student from './Student';
import Subject from './Subject';
import Response from './Response';
import Like from './Like';

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

  @ManyToOne(() => Student, student => student.posts, {
    cascade: ['update', 'remove'],
    nullable: false,
  })
  student: Student;

  @ManyToOne(() => Subject, subject => subject.posts, {
    cascade: ['update', 'remove'],
    nullable: false,
  })
  subject: Subject;

  @OneToMany(() => Response, responses => responses.post)
  responses: Response[];

  @OneToMany(() => Like, likes => likes.post)
  likes: Like[];
}
