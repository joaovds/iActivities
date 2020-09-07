import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import Post from './Post';
import Like from './Like';

@Entity('student')
export default class Student {
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

  @OneToMany(() => Post, posts => posts.student)
  posts: Post[];

  @OneToMany(() => Like, likes => likes.student)
  likes: Like[];
}
