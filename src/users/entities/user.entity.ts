import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,DeleteDateColumn } from 'typeorm';

// PrimaryGeneratedColumn สร้าง id pk ให้เอง

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({name: 'USER_ID'})
    userId: number;

    @Column({name: 'USER_NAME',nullable: false})
    userName: string;

    @Column({name: 'PASS_WORD',nullable: false})
    passWord: string;

    @Column({name: 'EMAIL',nullable: false})
    email: string;
   
    @Column({name: 'AGE',nullable: false})
    age: number; 
 
    @CreateDateColumn({name: 'CREATED_DATE'})
    createdAt: Date;

    @UpdateDateColumn({name: 'UPDATED_DATE'})
    updatedAt: Date; 

    @DeleteDateColumn({name: 'DELETED_DATE'})
    deletedAt: Date; 

    @Column({name: 'ACCESS_TOKEN'})
    accessToken: string;
    
}  
