import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column()
  balance: number;

  @Column({ length: 60 })
  email: string;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 30 })
  password: string;

  @Column({ length: 100 })
  salt: string;

  @Column({ length: 60 })
  signupVerifyToken: string;
}
