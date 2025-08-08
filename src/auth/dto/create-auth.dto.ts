import { IsNotEmpty, IsString, IsOptional, IsNumber, Min, IsDate } from 'class-validator';

export class CreateAuthDto {
    
    @IsString()
    userName: string;

    @IsString()
    passWord: string;

    email: string;

    age: number;
}
