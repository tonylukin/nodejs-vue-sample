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
exports.seed = seed;
const bcrypt_1 = __importDefault(require("bcrypt"));
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        // Deletes ALL existing entries
        yield knex("app.users").del();
        yield knex("app.weather_items").del();
        yield knex("app.cities").del();
        // Inserts seed entries
        yield knex("app.users").insert([
            { id: 1, password: bcrypt_1.default.hashSync('123456', 10), username: 'user1' },
            { id: 2, password: bcrypt_1.default.hashSync('111111', 10), username: 'user2' },
            { id: 3, password: bcrypt_1.default.hashSync('222222', 10), username: 'user3' },
        ]);
        yield knex("app.cities").insert([
            { id: 1, name: 'Moscow' },
            { id: 2, name: 'London' },
            { id: 3, name: 'Berlin' },
            { id: 4, name: 'New York' },
            { id: 5, name: 'Vladivostok' },
        ]);
        yield knex("app.weather_items").insert([
            { weather: 'Cloudy', city_id: 1, created_at: '2024-09-01' },
            { weather: 'Rainy', city_id: 1, created_at: '2024-08-01' },
            { weather: 'Sunny', city_id: 2, created_at: '2024-07-01' },
            { weather: 'Rainy', city_id: 2, created_at: '2024-08-01' },
            { weather: 'Sunny', city_id: 2, created_at: '2024-09-01' },
            { weather: 'Rainy', city_id: 3, created_at: '2024-08-01' },
            { weather: 'Cloudy', city_id: 3, created_at: '2024-07-01' },
            { weather: 'Cloudy', city_id: 4, created_at: '2024-09-01' },
            { weather: 'Rainy', city_id: 4, created_at: '2024-07-01' },
            { weather: 'Sunny', city_id: 5, created_at: '2024-09-01' },
            { weather: 'Rainy', city_id: 5, created_at: '2024-08-01' },
        ]);
    });
}
