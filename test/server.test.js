/* global beforeAll, describe, it, expect */

const request = require('supertest');
const app = require('../app');

describe('API Endpoints', () => {

    let token;

    beforeAll(async (done) => {
        const response = await request(app)
            .post('/api/token')
            .send('username=user1&password=123456')
            .set('Accept', 'application/json')
        ;
        expect(response.statusCode).toEqual(200);
        token = response.body.token;
        done();
    });

    it('should return success response', async () => {
        const response = await request(app).get('/weather/find?city_name=moscow&date=2024-08-01');
        expect(response.statusCode).toBe(200);
        expect(response.body).toContainEqual({
            weatherItem: {
                "weather": "Rainy",
                "createdAt": "2024-08-01T00:00:00.000Z"
            }
        });
    });
});