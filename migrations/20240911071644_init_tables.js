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
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema
            .createSchema('app')
            .createTable('app.users', (table) => {
            table.increments();
            table.string('username', 64).notNullable().unique();
            table.string('password', 64).notNullable();
            table.smallint('request_limit').defaultTo(null);
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .createTable('app.cities', (table) => {
            table.increments();
            table.string('name', 32).notNullable().unique();
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .createTable('app.weather_items', (table) => {
            table.increments();
            table.string('weather', 64);
            table.integer('city_id').references('id').inTable('app.cities');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema
            .dropTable('app.weather_items')
            .dropTable('app.cities')
            .dropTable('app.users')
            .dropSchema('app');
    });
}
