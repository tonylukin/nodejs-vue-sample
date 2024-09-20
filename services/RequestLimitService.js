"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestLimitService = void 0;
const User_1 = require("../models/User");
const dataSource_1 = __importDefault(require("../config/dataSource"));
const rabbitmq_1 = require("../lib/rabbitmq");
const userRepository = dataSource_1.default.getRepository(User_1.User);
class RequestLimitService {
    checkLimit(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const user = yield userRepository.findOneBy({ id: userId });
            if (user === null) {
                console.log(`[RequestLimitService::checkLimit] User #${userId} not found`);
                return false;
            }
            user.requestLimit = ((_a = user.requestLimit) !== null && _a !== void 0 ? _a : 0) + 1;
            userRepository.save(user);
            if (user.requestLimit < Number(process.env.USER_REQUEST_LIMIT || 100)) {
                return true;
            }
            console.log(`[RequestLimitService::checkLimit] User #${userId} has reached request limit`);
            (0, rabbitmq_1.sendMessage)((_b = process.env.RABBITMQ_QUEUE_NAME) !== null && _b !== void 0 ? _b : '', { userId: user.id, limit: user.requestLimit });
            return false;
        });
    }
}
exports.RequestLimitService = RequestLimitService;
