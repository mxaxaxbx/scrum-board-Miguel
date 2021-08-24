const boardModel = require('../models/board.model');

const fs   = require('fs');
const path = require('path');
const moment = require('moment');

const saveTask = async (req, res) => {
    if( !req.body.name || !req.body.description ) return res.status(400).send({
        code: 101,
        message: 'Incomplete Data',
    });

    const board = new boardModel({
        user_id     : req.user._id,
        name        : req.body.name,
        description : req.body.description,
        taskStatus  : 'to-do',
    });

    const result = await board.save();

    if( !result ) return res.status(400).send({
        code: 104,
        message: 'An error ocurred trying save data.',
    });

    return res.status(201).send({ data : board });
}

const saveTaskImg  = async (req, res) => {
    if( !req.body.name || !req.body.description ) return res.status(400).send({
        code: 101,
        message: 'Incomplete data'
    });

    let imageUrl = '';

    if( req.files != undefined && req.files.image.type ) {
        let url = `${ req.protocol }://${ req.get('host') }/`;
        let serverImg = `./uploads/${ moment().unix() }${ path.extname( req.files.image.path ) }`;

        fs.createReadStream( req.files.image.path )
            .pipe(
                fs.createWriteStream( serverImg )
            );

        imageUrl = `${ url }uploads/${ moment().unix() }${ path.extname( req.files.image.path ) }`;
    }

    let board = new boardModel({
        user_id : req.user._id,
        name : req.body.name,
        description : req.body.description,
        taskStatus : 'to-do',
        imageUrl,
    });

    let result = await board.save();

    if( !result ) return res.status(400).send({
        code : 104,
        message: 'An error ocurred trying saving the task',
    });

    return res.status(201).send({ data: board });
}

const listTask = async ( req, res ) => {
    const boards = await boardModel.find( { user_id: req.user._id } )

    return res.status(200).send( { data : boards } );
};

const updateTask = async ( req, res ) => {
    if( !req.body._id || !req.body.name || !req.body.description ) return res.status(400).send({
        code: 101,
        message: 'Incomplete Data',
    });

    let board = await boardModel.findByIdAndUpdate( req.body._id, {
        user_id     : req.user._id,
        name        : req.body.name,
        description : req.body.description,
        taskStatus  : req.body.task_status,
    } );

    if( !board ) return res.status(400).send({
        code: 104,
        message: 'You are not authorized for edit this task',
    });

    return res.status(200).send({ data: board._id });
};

const deleteTask = async ( req, res ) => {
    try {
        const board = await boardModel.findByIdAndDelete( req.params._id );
        if( !board ) return res.status(401).send({
            code: 104,
            message: 'You are not authorized for delete this task',
        });
    
        return res.status(200).send({ data: req.params._id });

    } catch (e) {
        console.log(`Board controller deleteTask error: ${e}`);
        return res.status(400).send({
            code: 105,
            message: 'An error ocurred please try again later',
        });
    }
};

module.exports = { saveTask, listTask, updateTask, deleteTask, saveTaskImg };
