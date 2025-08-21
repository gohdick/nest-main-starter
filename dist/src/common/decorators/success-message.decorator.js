"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessMessage = exports.SUCCESS_MESSAGE_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.SUCCESS_MESSAGE_KEY = 'success_message_key';
const SuccessMessage = (message) => (0, common_1.SetMetadata)(exports.SUCCESS_MESSAGE_KEY, message);
exports.SuccessMessage = SuccessMessage;
//# sourceMappingURL=success-message.decorator.js.map