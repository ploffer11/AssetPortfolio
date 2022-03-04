import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetEntity } from './entities/asset.entity';
import { Repository } from 'typeorm';
import { validate, validateOrReject } from 'class-validator';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(AssetEntity)
    private assetRepository: Repository<AssetEntity>,
  ) {}

  /**
   * Asset 테이블에 asset을 insert하는 함수. 이미 {uid, index} 를 가진 자산이 있다면 update만 한다.
   * @param asset
   * @returns
   */
  async insertAsset(uid: number, assets: AssetEntity[]) {
    for (let asset of assets) {
      delete asset.pk;

      let alreadyExistAsset = await this.assetRepository.findOne({
        uid,
        index: asset.index,
      });

      if (alreadyExistAsset) {
        asset['pk'] = alreadyExistAsset['pk'];
      }

      asset['uid'] = uid;

      this.assetRepository.save(asset).then((asset) => {
        console.log('[AssetService] First Save Asset', asset);
      });
    }
    this.deleteAsset(uid, assets.length);
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
    console.log('[AssetService] delete asset', uid, lastIndex);
    const asset = await this.assetRepository
      .createQueryBuilder()
      .delete()
      .where('uid = :uid AND index > :lastIndex', {
        uid: uid,
        lastIndex: lastIndex,
      })
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
    let assets = await this.assetRepository.find({ uid });
    console.log('[AssetService] all assets', assets);
    return assets;
  }
}
