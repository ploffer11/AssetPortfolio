import { Module, ValidationPipe } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { AuthService } from 'src/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetEntity } from './entities/asset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssetEntity])],
  controllers: [AssetController],
  providers: [AssetService, AuthService],
})
export class AssetModule {}
