import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
// PrimaryGeneratedColumn สร้าง id pk ให้เอง

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn({name: 'PRODUCT_ID'})
    productId: number;

    @Column({name: 'CATEGORY_ID',nullable: false})
    categoryId: number;

    @Column({name: 'PRODUCT_NAME',nullable: false})
    productName: string;

    @Column({name: 'PRICE',nullable: false})
    price: number; 

    @Column({name: 'STOCK',nullable: false})
    stock: number; 

    @Column({name: 'IMAGE',nullable: false})
    image: string;
    
    @Column({name: 'DESCRIPTION',nullable: false})
    description: string;

    @Column({name: 'BRAND',nullable: false})
    brand: string;

    @CreateDateColumn({name: 'CREATED_DATE'})
    createdAt: Date;

    @UpdateDateColumn({name: 'UPDATED_DATE'})
    updatedAt: Date; 

    @DeleteDateColumn({name: 'DELETED_DATE'})
    deletedAt: Date; 
    
}   
