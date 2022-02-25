import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetEntity } from './entities/asset.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(AssetEntity)
    private assetRepository: Repository<AssetEntity>,
  ) {}

  async getAllAsset(uid: number) {
    let asset = await this.assetRepository.find({ uid });
    console.log('[AssetService] all asset', asset);
    return asset;
  }

  async insertAsset(asset: AssetEntity) {
    console.log(asset.name, 'insert to DB');
    await this.assetRepository.save(asset).then((asset) => {
      console.log('[AssetService] Save Asset', asset);
    });
    return {
      statusCode: 200,
      message: 'Success Asset Save',
    };
  }
}
