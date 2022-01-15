const { Strategy: JwtStrategy, ExtractJwt } = require( 'passport-jwt' );
const User = require( '../src/models/user' );

module.exports = (passport) => {
    let options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme( 'jwt' );
    options.secretOrKey = process.env.JWT_SECRET_KEY;

    passport.use( new JwtStrategy( options, (jwt_payload, done) => {
        User.findById( jwt_payload.id, (err, user) => {
            if ( err ) {
                return done( err, false );
            } else if ( user ) {
                return done( null, user );
            } else {
                done( null, false );
            }
        } );
    } ) );
};
