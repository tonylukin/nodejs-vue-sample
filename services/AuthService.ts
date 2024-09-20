import bcrypt from "bcrypt";
import AppDataSource from "../config/dataSource";
import { User } from "../models/User";
import { Repository } from "typeorm";

const userRepository: Repository<User> = AppDataSource.getRepository(User);

export default class AuthService {

    authenticate = async (username: string, password: string, callback: Function) => {

        if (!username || !password) {
            return callback('Please provide your email and password.', null);
        }

        const user = await userRepository.findOneBy({
            username,
        });

        if (!user) {
            callback('Invalid Username or Password', null);
        } else {
            this.comparePassword(password, user.password, function (err: Error, match: boolean) {

                if (err) {
                    callback('Something is wrong. Please try again.', null);
                } else if (!match) {
                    callback('Invalid Username or Password', null);
                } else {
                    callback(null, user);
                }
            });
        }
    }

    comparePassword = (pass: string, passEnc: string, callback: Function) => {

        bcrypt.compare(pass, passEnc, function (error, res) {
            if (res) {
                callback(error, true);
            } else {
                callback(error, false);
            }
        });
    };
}