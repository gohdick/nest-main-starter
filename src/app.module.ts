import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
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
import { AuthModule } from './auth/auth.module';
import { JwtDecodeMiddleware } from './jwt-decode.middleware';
import { JwtService } from '@nestjs/jwt';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      synchronize: true,
      database: 'nest_auth',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    AuthModule,
    ProductsModule],
  
  controllers: [AppController],
  providers: [AppService ,
    JwtDecodeMiddleware,
    JwtService,
    {
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
export class AppModule {
  configure(consumer: MiddlewareConsumer) { // ให้ผู้ใช้ ผ่าน Middleware ก่อนที่จะเข้าถึง Controller
    consumer
      .apply(JwtDecodeMiddleware) //สร้างกฏให้ผู้ใช้ผ่าน Middleware ก่อนที่จะเข้าถึง Controller
      .exclude({ path: 'auth/register', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST }
      ) // ยกเว้นเส้นทาง login
      .forRoutes({ path: '*', method: RequestMethod.ALL }); // ทุกๆเส้นทางที่ใช้ก็ต้องผ่าน Middleware
  }
}