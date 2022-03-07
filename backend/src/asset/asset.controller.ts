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
    let assets: AssetEntity[] = insertAssetDto['assets'];
    console.log('[POST] /asset');
    return this.assetService.insertAsset(uid, assets);
  }

  @Post('/delete')
  deleteAsset(
    @Body() deleteAssetDto,
    @Body('authorization', ParseTokenPipe) { uid },
  ) {
    let lastIndex: number = deleteAssetDto['index'];
    console.log('[POST] /asset/delete');
    return this.assetService.deleteAsset(uid, lastIndex);
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
