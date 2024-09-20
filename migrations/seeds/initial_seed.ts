import { Knex } from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("app.users").del();
    await knex("app.weather_items").del();
    await knex("app.cities").del();

    // Inserts seed entries
    await knex("app.users").insert([
        { id: 1, password: bcrypt.hashSync('123456', 10), username: 'user1' },
        { id: 2, password: bcrypt.hashSync('111111', 10), username: 'user2' },
        { id: 3, password: bcrypt.hashSync('222222', 10), username: 'user3' },
    ]);
    await knex("app.cities").insert([
        { id: 1, name: 'Moscow' },
        { id: 2, name: 'London' },
        { id: 3, name: 'Berlin' },
        { id: 4, name: 'New York' },
        { id: 5, name: 'Vladivostok' },
    ]);
    await knex("app.weather_items").insert([
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
}
