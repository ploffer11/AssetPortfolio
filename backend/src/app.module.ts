import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetModule } from './asset/asset.module';

console.log('env', process.env.NODE_ENV, process.env.DATABASE_HOST);

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
