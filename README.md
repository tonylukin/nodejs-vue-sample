To install app run
```bash
docker compose up -d --build
npm i
knex migrate:latest
knex seed:run
```

- POST http://localhost:3012/api/token to get JWT token with body (form urlencoded): `username=user1` and `password=123456` or any of the other users
- GET http://localhost:3012/weather/find?city_name=moscow&date=2024-08-01 (with header `x-token` and token value)

Rabbit consumer: `node infrastructure/rabbitmq/consumer.js`
Create and fill `.env.local` with Gmail credentials

Run tests: `npm test`