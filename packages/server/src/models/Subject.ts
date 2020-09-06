import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('subject')
export default class Subject {
  @PrimaryGeneratedColumn('increment')
  cd_subject: number;

  @Column({
    length: 100,
    nullable: false,
    unique: true
  })
  name: string;
}
