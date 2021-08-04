const mongoose = require('mongoose');

const dbconnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser    : true,
            useFindAndModify   : false,
            useCreateIndex     : true,
            useUnifiedTopology : true,
        });
        console.log("Database connection successfully");;

    } catch( err ) {
        console.log("An error ocurred trying connectin to database: ", err);
        throw new Error("An error ocurred trying connectin to database");

    }
}

module.exports = { dbconnection };
