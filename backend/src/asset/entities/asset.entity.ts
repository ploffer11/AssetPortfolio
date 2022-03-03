import { Max, validate } from 'class-validator';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Asset')
export class AssetEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  pk: number;

  @Column()
  uid: number;

  @Column()
  index: number;

  @Column()
  count: number;

  @Column()
  buyPrice: number;

  @Column()
  sellPrice: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  buyDate: string;

  @Column({ type: 'date' })
  goalDate: string;

  @Column({ type: 'date' })
  sellDate: string;

  @Column()
  isUpdateNow: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async f() {
    console.log('???!!?');
    let err = await validate(this);
    console.log(err);
  }
}
