import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<{
        message: string;
        data: User[];
    }>;
    findOne(id: number): Promise<{
        message: string;
        data: User;
    }>;
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        data: {
            passWord: string;
            userName: string;
            email: string;
            age: number;
        } & User;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
