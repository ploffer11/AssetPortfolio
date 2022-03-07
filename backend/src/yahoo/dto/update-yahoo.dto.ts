import { PartialType } from '@nestjs/mapped-types';
import { CreateYahooDto } from './create-yahoo.dto';

export class UpdateYahooDto extends PartialType(CreateYahooDto) {}
