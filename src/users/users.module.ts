import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    global: true,
    secret: 'secretKey',
    signOptions: { expiresIn: '1h' },
  }), PassportModule.register({ defaultStrategy: 'jwt' })],
})
export class UsersModule {}
