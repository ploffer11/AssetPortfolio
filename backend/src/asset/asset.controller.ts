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
  Query,
} from '@nestjs/common';
import { AssetService } from './asset.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { InsertAssetDto } from './dto/insert-asset.dto';
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
    @Body() insertAssetDto: InsertAssetDto,
    @Body('authorization', ParseTokenPipe) { uid },
  ) {
    console.log('[POST] /asset');
    let assets: AssetEntity[] = insertAssetDto['asset'];
    console.log(assets);
    return this.assetService.insertAsset(uid, assets);
  }

  @Get('/all')
  getAllAsset(
    @Body() getAllAssetDto: GetAllAssetDto,
    @Query('authorization', ParseTokenPipe) { uid },
  ) {
    console.log('[GET] /asset/all');
    return this.assetService.getAllAsset(uid);
  }
}
