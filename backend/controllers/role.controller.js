const role = require('../models/role.model');
const userModel = require('../models/user.model');

const register = async ( req, res ) => {
    if( !req.body.name || !req.body.description ) return res.status(400).send({
        code    : '101',
        message : 'Process failed. Incomplete data.',
    });

    const existingRole = await role.findOne( { name : req.body.name } );

    if( existingRole ) return res.status(400).send({
        code : '102',
        message : 'Process failed. Role already exists.',
    });

    const roleObj = new role({
        name        : req.body.name,
        description : req.body.description,
        dbstatus    : true,
    });
    const result = await roleObj.save();

    if( !result ) return res.status(400).send('103. Process failed. Failed to register role');

    return res.status(201).send( { roleObj } );
};

const list = async ( req, res ) => {
    const roles = await role.find();
    return res.status(200).send( { data : roles } );
};

const update = async (req, res) => {
    if( !req.body._id || !req.body.description ) return res.status(404).send({
        code: 101,
        message: 'Incomplete data',
    });

    const roleObj = await role.findByIdAndUpdate( req.body._id, {
        description : req.body.description,
    });

    if( !roleObj ) return res.status(401).send({
        code: 102,
        message: 'An error ocurred. Please try again later',
    });

    return res.status(200).send( {data: req.body._id });
}

const delete_ = async (req, res) => {
    try {
        const roleObj = await role.findById( req.params.id );
        
        if( !roleObj ) return res.status(400).send({
            send: 102,
            message: 'Enter a valid role '
        });

        if( roleObj.name === "admin" ) return res.status(401).send({
            send: 102,
            message: 'The role admin cannot does delete'
        });

        const users = await userModel.find( { roleId : req.params.id });

        if( users.length > 0 ) return res.status(401).send({
            send: 102,
            message: `The current role have a ${users.length} users`
        });
        
        roleObj.delete();

        return res.status(200).send({ data: req.params.id })


    } catch( e ) {
        console.log(`Role controller delete_ error: ${e}`);
        return res.status(400).send({
            code: 105,
            message: 'An error ocurred. Please try again later',
        });
    }
}

module.exports = { register, list, update, delete_ };
