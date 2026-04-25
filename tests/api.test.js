const request = require('supertest');
const app = require('../index');

describe('Electricity API Comprehensive Test Suite', () => {
    
    it('GET /api/usage/total-by-year should return 200 and an object', async () => {
        const res = await request(app).get('/api/usage/total-by-year');
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toBe('object');
    });

    it('GET /api/users/total-by-year should return 200 and an object', async () => {
        const res = await request(app).get('/api/users/total-by-year');
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toBe('object');
    });

    it('GET /api/usage/:province/:year should return specific data', async () => {
        const res = await request(app).get('/api/usage/Bangkok/2565'); 
        expect(res.statusCode).toEqual(200);
        if(!res.body.message) {
            expect(res.body.province_name.toLowerCase()).toBe('bangkok');
        }
    });

    it('GET /api/users/:province/:year should return specific data', async () => {
        const res = await request(app).get('/api/users/Bangkok/2565');
        expect(res.statusCode).toEqual(200);
    });

    it('GET /api/usage/history/:province should return an array of history', async () => {
        const res = await request(app).get('/api/usage-history/Bangkok');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('GET /api/users/history/:province should return an array of history', async () => {
        const res = await request(app).get('/api/users-history/Bangkok');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('GET /api/usage/:province/:year should return "Data not found" for invalid queries', async () => {
        const res = await request(app).get('/api/usage/UnknownCity/2099');
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe("Data not found");
    });
});