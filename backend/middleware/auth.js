const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    let jwtToken = req.header("Authorization");
    
    if( !jwtToken ) return res.status(401).send({
        code: 104,
        message: 'Authorization denied',
    });

    jwtToken = jwtToken.split(' ')[1];

    if( !jwtToken ) return res.status(401).send({
        code: 104,
        message: 'Authorization denied',
    });

    try {
        const payload = await jwt.verify( jwtToken, process.env.SECRET_KEY_JWT );
        req.user = payload;
        next();

    } catch(e) {
        console.log(`Middleware auth error: ${e}`);
        return res.status(401).send({
            code: 104,
            message: 'Invalid Token',
        })
    }
}

module.exports = auth;
