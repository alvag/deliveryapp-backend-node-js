const express = require( 'express' );
const app = express();
const authController = require( '../controllers/authController' );

app.post( '/api/v1/login', authController.login );

module.exports = app;
