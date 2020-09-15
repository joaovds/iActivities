import {Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm';
import Student from './Student';
import Teacher from './Teacher';
import Post from './Post';

@Entity()
export default class Like {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  created_At: Date;

  @UpdateDateColumn()
  updated_At: Date;

  @ManyToOne(() => Student, student => student.likes, {
    cascade: ['update', 'remove'],
    nullable: false,
  })
  student: Student;

  @ManyToOne(() => Teacher, teacher => teacher.likes, {
    cascade: ['update', 'remove'],
    nullable: false,
  })
  teacher: Teacher;

  @ManyToOne(() => Post, post => post.likes, {
    cascade: ['update', 'remove'],
    nullable: false,
  })
  post: Post;
}
