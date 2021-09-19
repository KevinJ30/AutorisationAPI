
const express = require('express');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../index');

afterEach(() => {
    app.close();
})

describe('Using vgalid information', () => {

    it('should respond 200 route /token', async () => {
        const response = await request(app)
                            .get('/token')
                            .set({
                                client_id         : 'SPA_APP',
                                client_secret_key : "$2b$10$x9ZYL1hUysOT3vkPuoDCfOPU0UaD0UlL2dKCABazS2EBBWo7.Aqma",
                                request_type      : "GET"
                            });
        expect(200).toBe(response.statusCode);    
    })
    
    it('should return valid JWT token with valid informations', async () => {
        const response = await request(app)
                .get('/token')                        
                .set({client_id: 'SPA_APP', client_secret_key: "$2b$10$x9ZYL1hUysOT3vkPuoDCfOPU0UaD0UlL2dKCABazS2EBBWo7.Aqma", request_type: "GET"});
        const data = response.body;
        const verifyToken = jwt.verify(data.data.access_token, 'RMO7wFxZ00a6mfTwNvEXdcfwQJ2CTHAJOm')
        expect(typeof verifyToken).toBe('object');
    })
})

describe('Catch error with invalid parameters headers', () => {

    it('should obtains code 401', async () => {
        const response = await request(app).get('/token');
        expect(401).toBe(response.statusCode);
    })

})