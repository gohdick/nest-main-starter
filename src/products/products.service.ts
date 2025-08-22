import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll() {
    const products = await this.productRepository.find();
    if (!products) {
      throw new NotFoundException('ไม่พบสินค้า');
    }
    return {
      message: 'ค้นหาสินค้าสำเร็จ',
      data: products
    };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ productId: id });
    if (!product) {
      throw new NotFoundException('ไม่พบสินค้า');
    }
    return {
      message: 'ค้นหาสินค้าสำเร็จ',
      data: product
    };
  }

  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }


  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ productId: id });
    if (!product) {
      throw new NotFoundException('ไม่พบสินค้า');
    }
    const merged = this.productRepository.merge(product, updateProductDto);
    return this.productRepository.save(merged);
  }


  async remove(id: number) {
    const product = await this.productRepository.findOneBy({ productId: id });
    if (!product) {
      throw new NotFoundException('ไม่พบสินค้า');
    }
    return this.productRepository.delete(id);
  }
}
