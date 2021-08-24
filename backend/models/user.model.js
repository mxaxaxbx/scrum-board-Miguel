const mongoose = require('mongoose');
const jwt      = require('jsonwebtoken');
const moment   = require('moment');

const userSchema = new mongoose.Schema({
    name     : { type : String, required : true },
    email    : { type : String, required : true },
    password : { type : String, required : true },
    roleId   : { type: mongoose.Schema.Types.ObjectId, ref : "role" },
    date     : { type : Date, default : Date.now() },
    dbStatus : { type : Boolean, required : true },
});

userSchema.methods.generateJWT = function() {
    return jwt.sign(
        {
            _id     : this._id,
            name    : this.name,
            role_id : this.roleId,
            iat     : moment().unix(),
        },
        process.env.SECRET_KEY_JWT
    );
}

const user = mongoose.model("user",  userSchema);

module.exports = user;
