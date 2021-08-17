const userModel = require('../models/users.model');

const user = async (req, res, next) => {
    const user = await userModel.findById( req.user._id );

    if( !user ) return res.status(401).send({
        code: 104,
        message: 'Invalid user',
    });

    next();

}

module.exports = user;
