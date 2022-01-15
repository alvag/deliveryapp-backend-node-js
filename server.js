require( 'dotenv' ).config();
const express = require( 'express' );
const app = express();
const http = require( 'http' );
const server = http.createServer( app );
const logger = require( 'morgan' );
const cors = require( 'cors' );
const userRoutes = require( './src/routes/userRoutes' );

const port = process.env.PORT || 3000;

app.use( logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded( {
    extended: true
} ) );
app.use( cors() );

app.disabled( 'x-powered-by' );

// app.set( 'port', port );

// routes
app.use( userRoutes );

server.listen( port, () => {
    console.log( `Servidor corriendo en el puerto ${ port }` );
} );

/*app.use( (err, req, res, next) => {
    res.status( err.statusCode ).send( err.statusMessage );
} );*/

module.exports = { app, server };
