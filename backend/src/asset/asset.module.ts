import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [AssetController],
  providers: [AssetService, AuthService],
})
export class AssetModule {}
