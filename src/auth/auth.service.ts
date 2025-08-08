import { Injectable , NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService) {}

 async create(createAuthDto: CreateAuthDto) {
   const user = await this.usersService.create(createAuthDto);
    return {
      message: 'สร้างผู้ใช้สำเร็จ',
      data: user
    };
  }

  async login(createAuthDto: CreateAuthDto) {
    const payload = { userName: createAuthDto.userName, passWord: createAuthDto.passWord };
    const user = await this.userRepository.findOneBy({ userName: payload.userName });

    if (!user) {
      throw new NotFoundException('ไม่พบผู้ใช้');
    }

    user.accessToken = this.jwtService.sign(payload);
    await this.userRepository.save(user);

    return {
      access_token: user.accessToken,
    };
  }
  
  async logout(req: any) {
    // console.log(req.user);
    const userName = req.user.userName;
    const user = await this.userRepository.findOneBy({ userName: userName });
    // console.log(user);
    
    if (!user) {
      throw new NotFoundException('ไม่พบผู้ใช้');
    }

    user.accessToken = null;
    await this.userRepository.save(user);
    return {
      message: 'ออกจากระบบสำเร็จ',
      data: user
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
