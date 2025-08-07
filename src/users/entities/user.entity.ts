import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// PrimaryGeneratedColumn สร้าง id pk ให้เอง

@Entity('USERS')
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
}  
