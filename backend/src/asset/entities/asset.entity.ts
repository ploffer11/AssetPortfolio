import { IsBoolean, IsNumber, IsString, Max, validate } from 'class-validator';
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

  @IsNumber()
  @Column()
  index: number;

  @IsNumber()
  @Column()
  count: number;

  @IsNumber()
  @Column()
  buyPrice: number;

  @IsNumber()
  @Column()
  sellPrice: number;

  @IsString()
  @Column()
  name: string;

  @IsString()
  @Column()
  assetCode: string;

  @IsString()
  @Column()
  description: string;

  @IsString()
  @Column()
  currency: string;

  @IsString()
  @Column()
  currencySymbol: string;

  @IsBoolean()
  @Column()
  isUpdateNow: boolean;
}
