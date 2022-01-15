const db = require( '../../config/config' );

const User = {};

User.getAll = () => {
    const query = `SELECT *
                   FROM users`;

    return db.manyOrNone( query );
};

module.exports = User;
