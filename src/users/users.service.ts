import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashSync } from 'bcryptjs';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}


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
    const user = await this.userRepository.findOneBy({ userId: id });
    if (!user) {
      throw new NotFoundException('ไม่พบผู้ใช้');
    }
    return {
      message: 'ค้นหาผู้ใช้สำเร็จ',
      data: user
    };
  }

  async create(createUserDto: CreateUserDto) {
    // Hash password ก่อนบันทึก
    const hashedPassword = hashSync(createUserDto.passWord, 10);
    const userToSave = { ...createUserDto, passWord: hashedPassword };
    const user = await this.userRepository.save(userToSave);
    return {
      message: 'สร้างผู้ใช้สำเร็จ',
      data: user
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<{ message: string }> {
    // ตรวจสอบก่อนว่ามี user จริงไหม
    const user = await this.userRepository.findOneBy({ userId: id });
    if (!user) {
      throw new NotFoundException('ไม่พบผู้ใช้');
    }
  
    // ถ้ามีการส่งรหัสผ่านใหม่มา ให้ hash ก่อน
    let updateData = { ...updateUserDto };
    if (updateUserDto.passWord) {
      updateData.passWord = hashSync(updateUserDto.passWord, 10);
    }
  
    await this.userRepository.update(id, updateData);
    return { message: 'อัปเดตผู้ใช้สำเร็จ' };
  }


  async remove(id: number): Promise<{ message: string }> {
    // ตรวจสอบก่อนว่ามี user จริงไหม
    const user = await this.userRepository.findOneBy({ userId: id });
    if (!user) {
      throw new NotFoundException('ไม่พบผู้ใช้');
    }
    await this.userRepository.delete(id);
    return { message: 'ลบผู้ใช้สำเร็จ' };
  }
  

}