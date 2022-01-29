const express = require( 'express' );
const multer = require( 'multer' );
const userController = require( '../controllers/userController' );

const app = express();
const upload = multer( {
    storage: multer.memoryStorage()
} );

app.get( '/api/v1/users', userController.getAll );
app.post( '/api/v1/users', userController.create );
app.put( '/api/v1/users', upload.array( 'image', 1 ), userController.update );

module.exports = app;
