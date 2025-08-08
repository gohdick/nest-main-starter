import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private userRepository;
    private jwtService;
    constructor(usersService: UsersService, userRepository: Repository<User>, jwtService: JwtService);
    create(createAuthDto: CreateAuthDto): Promise<{
        message: string;
        data: {
            message: string;
            data: {
                passWord: string;
                userName: string;
                email: string;
                age: number;
            } & User;
        };
    }>;
    login(createAuthDto: CreateAuthDto): Promise<{
        access_token: string;
    }>;
    logout(req: any): Promise<{
        message: string;
        data: User;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAuthDto: UpdateAuthDto): string;
    remove(id: number): string;
}
