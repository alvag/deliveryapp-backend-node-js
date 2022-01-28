const User = require( '../models/user' );
const bcrypt = require( 'bcryptjs' );
const jwt = require( 'jsonwebtoken' );

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findByEmail( email );

        if ( user ) {
            const { id, name, lastname, phone, image, roles } = user;

            const isValidPassword = await bcrypt.compare( password, user.password );
            if ( isValidPassword ) {
                const token = jwt.sign( {
                    email, id,
                }, process.env.JWT_SECRET_KEY, {} );

                const data = {
                    id, name, lastname, email, phone, image, roles,
                    session_token: `JWT ${ token }`
                };

                return res.status( 200 ).json( {
                    success: true,
                    message: 'Usuario autenticado',
                    data
                } );
            }
        }

        return res.status( 401 ).json( {
            success: false,
            message: 'Usuario o contraseña incorrecto'
        } );


    } catch ( error ) {
        console.log( error );
        return res.status( 500 ).json( {
            success: false,
            message: 'Error al iniciar sesión',
            error
        } );
    }
};

module.exports = {
    login
};
