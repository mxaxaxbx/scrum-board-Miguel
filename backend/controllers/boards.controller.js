const boardModel = require('../models/boards.model');

const saveTask = async (req, res) => {
    if( !req.body.name || !req.body.description ) return res.status(400).send({
        code: 101,
        message: 'Incomplete Data',
    });

    const board = new boardModel({
        user_id     : req.body.user_id,
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

module.exports = { saveTask };
