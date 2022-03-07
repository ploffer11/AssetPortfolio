import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetModule } from './asset/asset.module';
import { YahooController } from './yahoo/yahoo.controller';
import { YahooModule } from './yahoo/yahoo.module';

console.log('env', process.env.NODE_ENV, process.env.FRONTEND_URL);

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'AssetPortfolio',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    AssetModule,
    YahooModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
