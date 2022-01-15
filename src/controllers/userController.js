const User = require( '../models/user' );

const getAll = async (req, res) => {
    try {
        const users = await User.getAll();
        return res.status( 200 ).json( users );
    } catch ( e ) {
        console.log( e );
        return res.status( 500 ).json( {
            success: false,
            message: 'Error al listar los usuarios'
        } );
    }
};

module.exports = {
    getAll
};
