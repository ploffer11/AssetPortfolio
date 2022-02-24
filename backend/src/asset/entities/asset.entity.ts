import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Asset')
export class AssetEntity {
  @PrimaryColumn()
  index: number;

  @Column()
  uid: number;

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
}
