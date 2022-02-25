import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
  ParseIntPipe,
} from '@nestjs/common';
import { AssetService } from './asset.service';
import { InsertAssetDto } from './dto/insert-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetAllAssetDto } from './dto/get-all-asset.dto';
import { AuthService } from 'src/auth/auth.service';
import { ParseTokenPipe } from 'src/pipe/parse-token.pipe';
import { AssetEntity } from './entities/asset.entity';

@UseGuards(AuthGuard)
@Controller('asset')
export class AssetController {
  constructor(
    private readonly assetService: AssetService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  insertAsset(
    @Body() insertAssetDto,
    @Body('authorization', ParseTokenPipe) { uid },
  ) {
    let asset: AssetEntity = insertAssetDto['asset'];
    asset['uid'] = uid;
    console.log('[POST] /asset', asset);
    return this.assetService.insertAsset(asset);
  }

  @Patch()
  updateAsset(@Body() updateAssetDto: UpdateAssetDto) {
    return;
  }

  @Patch()
  swapAsset(@Body() swapAssetDto) {
    return;
  }

  @Post('/all')
  getAllAsset(
    @Body() getAllAssetDto: GetAllAssetDto,
    @Body('authorization', ParseTokenPipe) { uid },
  ) {
    console.log('[POST] /asset/all');
    return this.assetService.getAllAsset(uid);
  }
}
