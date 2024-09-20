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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherItem = void 0;
const typeorm_1 = require("typeorm");
const City_1 = require("./City");
// todo city_id + created_at - make unique index
let WeatherItem = class WeatherItem {
};
exports.WeatherItem = WeatherItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WeatherItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WeatherItem.prototype, "weather", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], WeatherItem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => City_1.City, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'city_id' }),
    __metadata("design:type", City_1.City)
], WeatherItem.prototype, "city", void 0);
exports.WeatherItem = WeatherItem = __decorate([
    (0, typeorm_1.Entity)({ name: 'weather_items', schema: 'app' })
], WeatherItem);
