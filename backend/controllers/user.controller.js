const bcrypt   = require('bcrypt');
const mongoose = require("mongoose");

const user = require('../models/user.model');
const role = require('../models/role.model');

const register = async ( req, res ) => {
    if(!req.body.name || ! req.body.email || !req.body.password ) return res.status(401).send({
        code : 101,
        message : 'Incomplete data',
    });

    let existingUser = await user.findOne( { email : req.body.email } );

    if( existingUser ) return res.status(401).send({
        code : 102,
        message : 'Unexpected error',
    });

    let hash       = await bcrypt.hash(req.body.password, 10);
    let roleFinded = await role.findOne( { name : 'user' } );

    if( !roleFinded ) return res.status(401).send({
        code : 104,
        message : 'No role found. Contact with your admin',
    });

    let userObj = new user({
        name     : req.body.name,
        email    : req.body.email,
        password : hash,
        roleId   : roleFinded._id,
        dbStatus : true,
    });

    let result = await userObj.save();
    if( !result ) return res.status(400).send({
        code : 103,
        message : 'An error ocurred please try again later',
    });
    
    try {
        let jwt = userObj.generateJWT();
        res.status(201).send( { jwt } );

    } catch(e) {
        console.log(`User Controller Register Error. ${e}`);
        return res.status(400).send({
            code : 105,
            message : 'An error ocurred please try again later',
        });
        
    }

}

const list = async( req, res ) => {
    let users = await user.find( { name : new RegExp( req.params['name'], 'i' ) } )
        .populate("roleId")
        .exec();

    return res.status(200).send({ data: users });
}

const registerAdmin = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password || !req.body.roleId)
        return res
            .status(400)
            .send("Process failed: Incomplete data.");

    let validId = await mongoose.Types.ObjectId.isValid(req.body.roleId)
    if (!validId) return res.status(400).send("Process failed: Invalid ID.");

    let existingUser = await user.findOne({ email: req.body.email });
    if (existingUser) {
        if ( !existingUser.dbStatus ) return res.status(401).send("Current email is in blacklist. Contact admin");
        
        return res.status(400).send("Process failed: The email user is already registered.");
    }

    let hash = await bcrypt.hash(req.body.password, 10);

    let userObj = new user({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        roleId: req.body.roleId,
        dbStatus: true
    })
    let result = await userObj.save();
    if (!result) return res.status(400).send("Failed to register user.");
    try {
        let jwt = userObj.generateJWT();
        return res.status(200).send({ jwt });
    } catch (e) {
        console.log(e);
        return res.status(400).send("Failed to register user");
    }
};

const updateUser = async (req, res) => {
    if (!req.body._id || !req.body.name || !req.body.email || !req.body.roleId) return res.status(400).send({
        code: 101,
        message:"Process failed: Incomplete data."
    });

    let hash = '';

    if( req.body.password ) {
        hash = await bcrypt.hash(req.body.password,10);
    } else {
        const us = await user.findById( req.body._id );
        hash = us.password;
    }

    let userObj = await user.findByIdAndUpdate(req.body._id, {
        name : req.body.name,
        email: req.body.email,
        role_id: req.body.roleId,
        password: hash,
    });

    if( !userObj ) return res.status(400).send({
        code: 102,
        message: 'An error ocurred. Please try again later',
    });

    return res.status(200).send({ data: userObj });
};

const deleteUser = async (req, res) => {
    if (!req.body._id ) return res.status(401).send({
        code: 101,
        message:"Enter a valid user."
    });

    const userObj = await user.findByIdAndUpdate( req.body._id, {
        dbStatus : false,
    } );

    if( !userObj ) return res.status(401).send({
        code: 101,
        message:"Enter a valid user."
    });

    return res.status(200).send({ data: req.body._id });
};

module.exports = { register, list, registerAdmin, updateUser, deleteUser};
