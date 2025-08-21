import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    categoryId?: number;
    productName?: string;
    price?: number;
    stock?: number;
    image?: string;
    description?: string;
    brand?: string;
}
