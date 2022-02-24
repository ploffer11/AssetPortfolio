import { IsString } from 'class-validator';

export class GetAllAssetDto {
  @IsString()
  authorization: string;
}
