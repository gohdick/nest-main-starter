import { IsNotEmpty, IsString, IsOptional, IsNumber, Min, IsDate } from 'class-validator';

// IsNotEmpty ห้ามว่าง
// IsString ต้องเป็น string
// IsOptional ไม่ต้องกรอก
// IsNumber ต้องเป็น number
// Min ต้องมากกว่า

export class CreateProductDto {
    @IsNotEmpty()
    categoryId: number;

    @IsNotEmpty()
    productName: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    stock: number;

    @IsNotEmpty()
    image: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    brand: string;
}
