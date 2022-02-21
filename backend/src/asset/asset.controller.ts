import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AssetService } from './asset.service';
import { InsertAssetDto } from './dto/insert-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post()
  insertAsset(@Body() insertAssetDto: InsertAssetDto) {
    return;
  }

  @Patch()
  updateAsset(@Body() updateAssetDto: UpdateAssetDto) {
    return;
  }

  @Patch()
  swapAsset(@Body() swapAssetDto) {
    return;
  }

  @Get()
  findAllAsset() {
    return { statusCode: 200, message: 'Guard' };
  }
}
