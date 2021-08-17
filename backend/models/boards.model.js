const { Schema, model } = require('mongoose');

const boardSchema = new Schema({
    user_id     : { type: Schema.ObjectId, ref: "user" },
    name        : { type: String, required: true },
    description : { type: String, required: true },
    taskStatus  : { type: String, required: true },
    image_url   : { type: String, required: false },
    date        : { type : Date, default : Date.now() },
});

const board = model("board",  boardSchema);

module.exports = board;
