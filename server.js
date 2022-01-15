const express = require( 'express' );
const app = express();
const http = require( 'http' );
const server = http.createServer( app );
const logger = require( 'morgan' );
const cors = require( 'cors' );

const port = process.env.PORT || 3000;

app.use( logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded( {
    extended: true
} ) );
app.use( cors() );

app.disabled( 'x-powered-by' );

// app.set( 'port', port );

server.listen( port, () => {
    console.log( `Servidor corriendo en el puerto ${ port }` );
} );

app.get( '/', (req, res) => {
    res.send( 'DeliveryApp!!' );
} );

app.use( (err, req, res, next) => {
    res.status( err.statusCode ).send( err.statusMessage );
} );