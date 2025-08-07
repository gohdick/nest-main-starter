import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        data: {
            passWord: string;
            userName: string;
            email: string;
            age: number;
        } & import("./entities/user.entity").User;
    }>;
    findAll(): Promise<{
        message: string;
        data: import("./entities/user.entity").User[];
    }>;
    findOne(id: string): Promise<{
        message: string;
        data: import("./entities/user.entity").User;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
