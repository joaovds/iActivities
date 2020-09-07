import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import Post from './Post';
import Teacher from './Teacher';

@Entity('subject')
export default class Subject {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    length: 100,
    nullable: false,
    unique: true
  })
  name: string;

  @OneToMany(() => Post, posts => posts.subject)
  posts: Post[];

  @OneToMany(() => Teacher, teachers => teachers.subject)
  teachers: Teacher[];
}
