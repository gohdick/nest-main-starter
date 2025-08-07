"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./users/entities/user.entity");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const all_exceptions_filter_1 = require("../filters/all-exceptions.filter");
const query_failed_exception_filter_1 = require("../filters/query-failed-exception.filter");
const validation_pipe_1 = require("../pipes/validation.pipe");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            users_module_1.UsersModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                autoLoadEntities: true,
                synchronize: false,
                database: 'nest_auth',
                host: '127.0.0.1',
                port: 3306,
                username: 'root',
                password: '',
                entities: [user_entity_1.User],
            })],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, {
                provide: core_1.APP_FILTER,
                useClass: all_exceptions_filter_1.AllExceptionsFilter,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: query_failed_exception_filter_1.QueryFailedExceptionFilter,
            },
            {
                provide: core_1.APP_PIPE,
                useClass: validation_pipe_1.ValidationPipe,
            },],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map