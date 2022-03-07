import { Module } from '@nestjs/common';
import { YahooService } from './yahoo.service';
import { YahooController } from './yahoo.controller';
import { AssetService } from 'src/asset/asset.service';
import { AssetModule } from 'src/asset/asset.module';
import { AuthService } from 'src/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetEntity } from 'src/asset/entities/asset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssetEntity])],
  controllers: [YahooController],
  providers: [YahooService, AuthService, AssetService],
})
export class YahooModule {}
