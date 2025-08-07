import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';


@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      autoLoadEntities: true,
      synchronize: true,
      database: 'nest_auth',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      entities: [User],
    })],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
