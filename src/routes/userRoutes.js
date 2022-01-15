const express = require( 'express' );
const app = express();

const userController = require( '../controllers/userController' );

app.get( '/api/v1/users', userController.getAll );
app.post( '/api/v1/users', userController.create );

module.exports = app;
