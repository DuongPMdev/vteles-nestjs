import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('account')
export class Account {

  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ unique: true })
  @Exclude()
  telegram_id: string;

  @Column({ unique: true })
  @Exclude()
  custom_login_id: string;

  @Column({ unique: true })
  account_id: string;

  @Column()
  owner_id: string;

  @Column()
  @Exclude()
  custom_password: string;

  @Column()
  display_name: string;

  @Column()
  room: number;

  @Column()
  position: string;

  @Column()
  last_accessed: Date;

  @Column()
  created_datetime: Date;

  @Column()
  expired_datetime: Date;

  @Column()
  deleted: number;
  
}
