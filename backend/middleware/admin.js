const roleModel = require('../models/role.model');

const admin = async( req, res, next ) => {
    let role = await roleModel.findById( req.user.role_id );
    
    if( !role ) return res.status(401).send({
        code: 104,
        message: 'Invalid role',
    });

    if( role.name !== 'admin' ) return res.status(401).send({
        code: 104,
        message: 'Current role  is not admin authorized',
    });

    next();
};

module.exports = admin;
