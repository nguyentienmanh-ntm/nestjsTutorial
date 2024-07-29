import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // Nạp biến môi trường từ file .env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule để có thể sử dụng ConfigService
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User],
        synchronize: true,
      }),
      inject: [ConfigService], // Inject ConfigService vào useFactory
    }),
    UserModule, // Nhập UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
