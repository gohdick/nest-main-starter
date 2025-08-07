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
const bcryptjs_1 = require("bcryptjs");
let UsersService = class UsersService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
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
        const user = await this.userRepository.findOneBy({ userId: id });
        if (!user) {
            throw new common_1.NotFoundException('ไม่พบผู้ใช้');
        }
        return {
            message: 'ค้นหาผู้ใช้สำเร็จ',
            data: user
        };
    }
    async create(createUserDto) {
        const hashedPassword = (0, bcryptjs_1.hashSync)(createUserDto.passWord, 10);
        const userToSave = { ...createUserDto, passWord: hashedPassword };
        const user = await this.userRepository.save(userToSave);
        return {
            message: 'สร้างผู้ใช้สำเร็จ',
            data: user
        };
    }
    async update(id, updateUserDto) {
        const user = await this.userRepository.findOneBy({ userId: id });
        if (!user) {
            throw new common_1.NotFoundException('ไม่พบผู้ใช้');
        }
        let updateData = { ...updateUserDto };
        if (updateUserDto.passWord) {
            updateData.passWord = (0, bcryptjs_1.hashSync)(updateUserDto.passWord, 10);
        }
        await this.userRepository.update(id, updateData);
        return { message: 'อัปเดตผู้ใช้สำเร็จ' };
    }
    async remove(id) {
        const user = await this.userRepository.findOneBy({ userId: id });
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