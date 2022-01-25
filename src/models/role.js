const db = require( '../../config/config' );

const create = (id_user, id_role) => {
    const query = `INSERT INTO user_has_roles(id_user,
                                              id_role,
                                              created_at,
                                              updated_at)
                   VALUES ($1, $2, $3, $4)`;

    return db.none( query, [
        id_user,
        id_role,
        new Date(),
        new Date()
    ] );
};

module.exports = { create };
