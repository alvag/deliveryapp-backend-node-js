require( 'dotenv' ).config();

const write = require( './src/utils/write_service_account' );
write();

const express = require( 'express' );
const app = express();
const http = require( 'http' );
const server = http.createServer( app );
const logger = require( 'morgan' );
const cors = require( 'cors' );
const passport = require( 'passport' );
const serviceAccount = require( './serviceAccountKey.json' );
const fbAdmin = require( 'firebase-admin' );


fbAdmin.initializeApp( {
    credential: fbAdmin.credential.cert( serviceAccount )
} );

const userRoutes = require( './src/routes/userRoutes' );
const authRoutes = require( './src/routes/authRoutes' );

const port = process.env.PORT || 3000;

app.use( logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded( {
    extended: true
} ) );
app.use( cors() );
app.use( passport.initialize( {} ) );


require( './config/passport' )( passport );

app.disabled( 'x-powered-by' );

// app.set( 'port', port );

// routes
app.use( userRoutes );
app.use( authRoutes );

server.listen( port, () => {
    console.log( `Servidor corriendo en el puerto ${ port }` );
} );

/*app.use( (err, req, res, next) => {
    res.status( err.statusCode ).send( err.statusMessage );
} );*/

module.exports = { app, server };
