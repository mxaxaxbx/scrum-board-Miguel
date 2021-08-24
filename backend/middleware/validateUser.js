const userModel = require('../models/user.model');
const mongoose  = require('mongoose');

const user = async (req, res, next) => {
    const user = await userModel.findById( req.user._id );

    if( !user ) return res.status(400).send({
        code: 101,
        message: 'Invaliduser',
    });

    const isValidId = mongoose.Types.ObjectId.isValid( req.user._id );
    if ( !isValidId ) return res.status(401).send({
        code: 104,
        message: 'Invalid user',
    });

    next();
}

module.exports = user;
