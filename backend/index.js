const express        = require('express');
const cors           = require('cors');
const {dbconnection} = require('./db/db');

const roleRoutes = require('./routes/role.router');
const userRoutes = require('./routes/user.router');
const authRoutes = require('./routes/auth.router');
const boardRotes = require('./routes/board.router');

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/board', boardRotes);
app.use('/uploads', express.static('uploads'));

app.listen( process.env.PORT, () =>
    console.log("Backend server running on port: " + process.env.PORT )
);

dbconnection();
