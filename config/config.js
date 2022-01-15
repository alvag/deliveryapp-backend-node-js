const promiseLib = require( 'bluebird' );

const pgp = require( 'pg-promise' )( { promiseLib } );
const types = pgp.pg.types;
types.setTypeParser( 1114, (stringValue) => stringValue );

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

const db = pgp( dbConfig );

module.exports = db;
