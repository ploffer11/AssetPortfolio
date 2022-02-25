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

  /**
   * Asset 테이블에 asset을 추가하는 함수
   * @param asset
   * @returns
   */
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

  /**
   * Asset 테이블에서 uid에 해당하는 자산들을 확인해서 index > lastIndex인 자산들을 삭제
   * @param lastIndex
   */
  async deleteAsset(uid: number, lastIndex: number) {
    const asset = await this.assetRepository
      .createQueryBuilder()
      .delete()
      .where('index > :lastIndex', { lastIndex: lastIndex })
      .execute();
    console.log('[AssetService] Delete Asset', asset, lastIndex);
    return {
      statusCode: 200,
      message: 'Success Asset Delete',
    };
  }

  /**
   * Asset 테이블에서 uid에 해당하는 자산들을 전부 반환
   * @param uid
   * @returns
   */
  async getAllAsset(uid: number) {
    let asset = await this.assetRepository.find({ uid });
    console.log('[AssetService] all asset', asset);
    return asset;
  }
}
