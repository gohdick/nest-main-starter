"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtDecodeMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
let JwtDecodeMiddleware = class JwtDecodeMiddleware {
    use(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            throw new common_1.UnauthorizedException('Token not found');
        }
        const decoded = jwt.decode(token);
        req.user = decoded;
        next();
    }
};
exports.JwtDecodeMiddleware = JwtDecodeMiddleware;
exports.JwtDecodeMiddleware = JwtDecodeMiddleware = __decorate([
    (0, common_1.Injectable)()
], JwtDecodeMiddleware);
//# sourceMappingURL=jwt-decode.middleware.js.map