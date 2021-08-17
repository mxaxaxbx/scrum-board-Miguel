const roleModel = require('../models/roles.model');

const register = async ( req, res ) => {
    if( !req.body.name || !req.body.description ) return res.status(400).send({
        code    : '101',
        message : 'Process failed. Incomplete data.',
    });

    const existingroleModel = await roleModel.findOne( { name : req.body.name } );

    if( existingroleModel ) return res.status(400).send({
        code : '102',
        message : 'Process failed. role already exists.',
    });

    const roleObj = new roleModel({
        name        : req.body.name,
        description : req.body.description,
        dbstatus    : true,
    });
    const result = await roleObj.save();

    if( !result ) return res.status(400).send('103. Process failed. Failed to register role');

    return res.status(201).send( { data : roleObj } );
};

const list = async ( req, res ) => {
    const roles = await roleModel.find();
    return res.status(200).send( { data : roles } );
};

module.exports = { register, list };
