import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity('student')
export default class Student {
  @PrimaryGeneratedColumn('increment')
  cd_student: number;

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
}
