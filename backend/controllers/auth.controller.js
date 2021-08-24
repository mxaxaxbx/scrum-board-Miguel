const bcrypt    = require('bcrypt');
const userModel = require('../models/user.model');

const login = async (req, res) => {
    let user = await userModel.findOne( { email: req.body.email } );
    
    if( !user ) return res.status(401).send({
        code: 102,
        message: 'Invalid credentials',
    });

    if( !user.dbStatus ) return res.status(401).send({
        code: 102,
        message: 'Invalid credentials',
    });

    const hash = await bcrypt.compare( req.body.password, user.password );

    if( !hash ) return res.status(401).send({
        code: 102,
        message: 'Invalid credentials',
    });

    try {
        const jwtToken = user.generateJWT();
        return res.status(200).send( { data: jwtToken } );
    } catch(e) {
        console.log(`Auth Controler Login Error: ${e}`);
        return res.status(400).send({
            code: 105,
            message: 'An error ocurred. Please try again later',
        });
    }
}

module.exports = {login};
