const User = require( '../models/user' );
const Role = require( '../models/role' );
const jwt = require( 'jsonwebtoken' );
const storage = require( '../utils/cloud_storage' );

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

const create = async (req, res) => {
    try {
        const { id } = await User.create( req.body );

        await Role.create( id, 1 );

        const { email, name, lastname, phone, image } = req.body;

        const token = jwt.sign( {
            email, id,
        }, process.env.JWT_SECRET_KEY, {} );

        const data = {
            id, name, lastname, email, phone, image,
            session_token: `JWT ${ token }`
        };

        return res.status( 201 ).json( {
            success: true,
            message: 'Usuario registrado correctamente',
            data
        } );
    } catch ( error ) {
        console.log( error );
        return res.status( 500 ).json( {
            success: false,
            message: 'Error al registrar el usuario',
            error
        } );
    }
};

const update = async (req, res) => {
    try {
        const user = JSON.parse( req.body.user );
        const { files = [] } = req;

        if ( files.length ) {
            const imageName = `image_${ Date.now() }`;
            const url = await storage( files[0], imageName );

            if ( url ) {
                user.image = url;
            }
        }

        await User.update( user );

        return res.status( 200 ).json( {
            success: true,
            message: 'Usuario actualizado correctamente',
            data: user
        } );

    } catch ( error ) {
        console.log( error );
        return res.status( 500 ).json( {
            success: false,
            message: 'Error al actualizar los datos',
            error
        } );
    }
};


module.exports = {
    getAll,
    create,
    update
};
