const db = require( '../../config/config' );
const bcrypt = require( 'bcryptjs' );

const getAll = () => {
    const query = `SELECT *
                   FROM users`;

    return db.manyOrNone( query );
};

const create = async (user) => {

    const hash = await bcrypt.hash( user.password, 10 );

    const query = `INSERT INTO users(email,
                                     name,
                                     lastname,
                                     phone,
                                     image,
                                     password,
                                     created_at,
                                     updated_at)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;

    return db.oneOrNone( query, [
        user.email,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        hash,
        new Date(),
        new Date()
    ] );
};

const findById = (id, callback) => {
    const query = `SELECT *
                   FROM users
                   WHERE id = $1`;

    return db.oneOrNone( query, id ).then( user => {
        callback( null, user );
    } );
};

const findByEmail = (email) => {
    const query = `SELECT *
                   FROM users
                   WHERE email = $1`;

    return db.oneOrNone( query, email );
};

module.exports = { getAll, create, findById, findByEmail };
