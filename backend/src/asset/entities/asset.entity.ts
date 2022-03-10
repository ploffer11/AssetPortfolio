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

  @Column()
  assetCode: string;

  @Column()
  description: string;

  @Column()
  isUpdateNow: boolean;
}
