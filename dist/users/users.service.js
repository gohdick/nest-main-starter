"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const zod_1 = require("zod");
let UsersService = class UsersService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const schema = zod_1.z.object({
            username: zod_1.z.string().min(1, 'username is required'),
            email: zod_1.z.string().email('email is invalid'),
            password: zod_1.z.string().min(6, 'password ต้องมากกว่า 6 ตัวอักษร'),
            age: zod_1.z.number().min(18, 'อายุต้องมากกว่า 18 ปี'),
        });
        const result = schema.safeParse(createUserDto);
        if (!result.success) {
            const messages = result.error.issues.map(e => e.message).join(', ');
            throw new common_1.BadRequestException(messages);
        }
        const user = await this.userRepository.save(createUserDto);
        return {
            message: 'สร้างผู้ใช้สำเร็จ',
            data: user
        };
    }
    async findAll() {
        const users = await this.userRepository.find();
        if (!users) {
            throw new common_1.NotFoundException('ไม่พบผู้ใช้');
        }
        return {
            message: 'ค้นหาผู้ใช้สำเร็จ',
            data: users
        };
    }
    async findOne(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.NotFoundException('ไม่พบผู้ใช้');
        }
        return {
            message: 'ค้นหาผู้ใช้สำเร็จ',
            data: user
        };
    }
    async update(id, updateUserDto) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.NotFoundException('ไม่พบผู้ใช้');
        }
        const schema = zod_1.z.object({
            name: zod_1.z.string().min(1, 'name is required').optional(),
            password: zod_1.z.string().min(6, 'password ต้องมากกว่า 6 ตัวอักษร').optional(),
            email: zod_1.z.string().email('email is invalid').optional(),
            age: zod_1.z.number().min(18, 'อายุต้องมากกว่า 18 ปี').optional(),
        });
        const result = schema.safeParse(updateUserDto);
        if (!result.success) {
            const messages = result.error.issues.map(e => e.message).join(', ');
            throw new common_1.BadRequestException(messages);
        }
        await this.userRepository.update(id, updateUserDto);
        return { message: 'อัปเดตผู้ใช้สำเร็จ' };
    }
    async remove(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.NotFoundException('ไม่พบผู้ใช้');
        }
        await this.userRepository.delete(id);
        return { message: 'ลบผู้ใช้สำเร็จ' };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map