import { CreateProductDto } from './create-product.dto';
declare const UpdateProductDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProductDto>>;
export declare class UpdateProductDto extends UpdateProductDto_base {
    categoryId?: number;
    productName?: string;
    price?: number;
    stock?: number;
    image?: string;
    description?: string;
    brand?: string;
}
export {};
