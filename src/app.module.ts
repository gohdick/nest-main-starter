import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { AllExceptionsFilter } from '../filters/all-exceptions.filter';
import { QueryFailedExceptionFilter } from '../filters/query-failed-exception.filter';
import { ValidationPipe } from '../pipes/validation.pipe';

// synchroniz ถ้ามีการเปลี่ยนแปลงใน entity จะให้สร้าง table ใหม่

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      autoLoadEntities: true,
      synchronize: false,
      database: 'nest_auth',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      entities: [User],
    })],
  
  controllers: [AppController],
  providers: [AppService ,{
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  },
  {
    provide: APP_FILTER,
    useClass: QueryFailedExceptionFilter,
  },
  {
    provide: APP_PIPE,
    useClass: ValidationPipe, 
  },],
})
export class AppModule {}