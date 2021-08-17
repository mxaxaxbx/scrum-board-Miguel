const { Schema, model } = require('mongoose');
const jwt        = require('jsonwebtoken');
const moment     = require('moment');

const userSchema = new Schema({
    name     : { type : String, required : true },
    email    : { type : String, required : true },
    password : { type : String, required : true },
    role_id  : { type : Schema.Types.ObjectId, ref : "role" },
    date     : { type: Date, default: Date.now() },
    status   : { type: Boolean, required : true },
});

userSchema.methods.generateJWT = function() {
    return jwt.sign(
        {
            _id  : this._id,
            name : this.name,
            iat  : moment().unix(),
        },
        process.env.SECRET_KEY_JWT
    );
}

const user = model('user', userSchema);

module.exports = user;
