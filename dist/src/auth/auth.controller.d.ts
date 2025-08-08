import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createAuthDto: CreateAuthDto): Promise<{
        message: string;
        data: {
            message: string;
            data: {
                passWord: string;
                userName: string;
                email: string;
                age: number;
            } & import("../users/entities/user.entity").User;
        };
    }>;
    login(createAuthDto: CreateAuthDto): Promise<{
        access_token: string;
    }>;
    logout(req: Request): Promise<{
        message: string;
        data: import("../users/entities/user.entity").User;
    }>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAuthDto: UpdateAuthDto): string;
    remove(id: string): string;
}
