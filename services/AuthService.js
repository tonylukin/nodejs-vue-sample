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
const bcrypt_1 = __importDefault(require("bcrypt"));
const dataSource_1 = __importDefault(require("../config/dataSource"));
const User_1 = require("../models/User");
const userRepository = dataSource_1.default.getRepository(User_1.User);
class AuthService {
    constructor() {
        this.authenticate = (username, password, callback) => __awaiter(this, void 0, void 0, function* () {
            if (!username || !password) {
                return callback('Please provide your email and password.', null);
            }
            const user = yield userRepository.findOneBy({
                username,
            });
            if (!user) {
                callback('Invalid Username or Password', null);
            }
            else {
                this.comparePassword(password, user.password, function (err, match) {
                    if (err) {
                        callback('Something is wrong. Please try again.', null);
                    }
                    else if (!match) {
                        callback('Invalid Username or Password', null);
                    }
                    else {
                        callback(null, user);
                    }
                });
            }
        });
        this.comparePassword = (pass, passEnc, callback) => {
            bcrypt_1.default.compare(pass, passEnc, function (error, res) {
                if (res) {
                    callback(error, true);
                }
                else {
                    callback(error, false);
                }
            });
        };
    }
}
exports.default = AuthService;
