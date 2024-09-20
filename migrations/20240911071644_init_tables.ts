import {Knex} from "knex";

export async function up(knex: Knex): Promise<void> {
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
        })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable('app.weather_items')
        .dropTable('app.cities')
        .dropTable('app.users')
        .dropSchema('app')
}

