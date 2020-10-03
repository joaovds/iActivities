import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany} from 'typeorm';
import Like from './Like';
import Post from './Post';
import Teacher from './Teacher';

@Entity()
export default class Response {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    nullable: false
  })
  response_body: string;

  @CreateDateColumn()
  created_At: Date;

  @UpdateDateColumn()
  updated_At: Date;

  @ManyToOne(() => Post, post => post.responses, {
    cascade: ['update', 'remove'],
    nullable: false,
  })
  post: Post;

  @ManyToOne(() => Teacher, teacher => teacher.responses, {
    cascade: ['update', 'remove'],
    nullable: false,
  })
  teacher: Teacher;

  @OneToMany(() => Like, likes => likes.response)
  likes: Like[];
}
