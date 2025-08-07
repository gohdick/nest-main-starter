import { IsNotEmpty, IsString, IsOptional, IsNumber, Min, IsDate } from 'class-validator';

// IsNotEmpty ห้ามว่าง
// IsString ต้องเป็น string
// IsOptional ไม่ต้องกรอก
// IsNumber ต้องเป็น number
// Min ต้องมากกว่า

export class CreateUserDto {
    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    passWord: string;

    @IsNotEmpty()
    email: string;

    @IsNumber()
    age: number;
}
