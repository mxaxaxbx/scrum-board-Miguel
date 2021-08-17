const express          = require('express');
const cors             = require('cors');
const { dbconnection } = require('./db/db');

const roleRoutes = require('./routes/roles.router');
const userRoutes = require('./routes/users.router');
const authRoutes = require('./routes/auth.router');
const boardRoutes = require('./routes/boards.router');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);

app.listen( process.env.PORT, () => {
    console.log(`Backend server running on port: ${process.env.PORT}`);
});

dbconnection();
