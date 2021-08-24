const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    user_id      : { type: mongoose.Schema.ObjectId, ref: "user" },
    name        : String,
    description : String,
    taskStatus  : String,
    imageUrl    : String,
    date        : { type : Date, default : Date.now() },
});

const board = mongoose.model("board",  boardSchema);

module.exports = board;
