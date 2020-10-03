import {Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm';
import Student from './Student';
import Teacher from './Teacher';
import Response from './Response';

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
  })
  student: Student;

  @ManyToOne(() => Teacher, teacher => teacher.likes, {
    cascade: ['update', 'remove'],
  })
  teacher: Teacher;

  @ManyToOne(() => Response, response => response.likes, {
    cascade: ['update', 'remove'],
    nullable: false,
  })
  response: Response;
}
