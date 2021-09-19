/**
 * ENTRY POINT APP
 **/

const { response } = require('express');
const express = require('express');
const app = express();

const {AuthController} = require('./Controller/AuthController.js');

app.get('/token', AuthController.token)

module.exports = app.listen(3001, () => {});

