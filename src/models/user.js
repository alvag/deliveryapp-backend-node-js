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
    const query = `SELECT u.*,
                          json_agg(
                                  json_build_object(
                                          'id', r.id,
                                          'name', r.name,
                                          'image', r.image,
                                          'route', r.route
                                      )
                              ) AS roles
                   FROM users AS u
                            INNER JOIN user_has_roles AS ur
                                       ON ur.id_user = u.id
                            INNER JOIN roles AS r
                                       ON r.id = ur.id_role
                   WHERE email = $1
                   GROUP BY u.id`;

    return db.oneOrNone( query, email );
};

const update = (user) => {
    const query = `UPDATE users
                   SET name       = $2,
                       lastname   = $3,
                       phone      = $4,
                       image      = $5,
                       updated_at = $6
                   WHERE id = $1`;

    return db.none( query, [
        user.id,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        new Date()
    ] )
};

module.exports = {
    getAll,
    create,
    findById,
    findByEmail,
    update
};
