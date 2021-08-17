const { Schema, model } = require('mongoose');

const roleSchema = new Schema({
    name        : { type : String, required : true },
    description : { type : String, required : true },
    date        : { type : Date, default : Date.now() },
    status      : { type : Boolean, required : true },
});

const role = model("role",  roleSchema);

module.exports = role;
