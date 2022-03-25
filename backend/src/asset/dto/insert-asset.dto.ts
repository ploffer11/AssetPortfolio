import { Transform } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { AssetEntity } from '../entities/asset.entity';

export class InsertAssetDto {
  @IsString()
  authorization: string;

  @Transform((params) => {
    return params.value.map((asset) => Object.assign(new AssetEntity(), asset));
  })
  @ValidateNested()
  asset: AssetEntity[];
}
