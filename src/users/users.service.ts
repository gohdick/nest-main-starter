import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { z } from 'zod';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {

    // Validate ด้วย zod
    const schema = z.object({
      username: z.string().min(1, 'username is required'),
      email: z.string().email('email is invalid'),
      password: z.string().min(6, 'password ต้องมากกว่า 6 ตัวอักษร'),
      age: z.number().min(18, 'อายุต้องมากกว่า 18 ปี'),
    });

    const result = schema.safeParse(createUserDto);
    if (!result.success) {
      const messages = result.error.issues.map(e => e.message).join(', ');
      throw new BadRequestException(messages);
    }

    const user = await this.userRepository.save(createUserDto);
    return {
      message: 'สร้างผู้ใช้สำเร็จ',
      data: user
    };
  }

 async findAll() {
  const users = await this.userRepository.find();
  if (!users) {
    throw new NotFoundException('ไม่พบผู้ใช้');
  }
    return {
      message: 'ค้นหาผู้ใช้สำเร็จ',
      data: users
    };

  }


 async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('ไม่พบผู้ใช้');
    }
    return {
      message: 'ค้นหาผู้ใช้สำเร็จ',
      data: user
    };
  }


  async update(id: number, updateUserDto: UpdateUserDto): Promise<{ message: string }> {
    // ตรวจสอบก่อนว่ามี user จริงไหม
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('ไม่พบผู้ใช้');
    }
    // Validate ด้วย zod
    const schema = z.object({
      name: z.string().min(1, 'name is required').optional(),
      password: z.string().min(6, 'password ต้องมากกว่า 6 ตัวอักษร').optional(),
      email: z.string().email('email is invalid').optional(),
      age: z.number().min(18, 'อายุต้องมากกว่า 18 ปี').optional(),
    });
    const result = schema.safeParse(updateUserDto);
    if (!result.success) {
      const messages = result.error.issues.map(e => e.message).join(', ');
      throw new BadRequestException(messages);
    }
    await this.userRepository.update(id, updateUserDto);
    return { message: 'อัปเดตผู้ใช้สำเร็จ' };
  }


  async remove(id: number): Promise<{ message: string }> {
    // ตรวจสอบก่อนว่ามี user จริงไหม
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('ไม่พบผู้ใช้');
    }
    await this.userRepository.delete(id);
    return { message: 'ลบผู้ใช้สำเร็จ' };
  }

}