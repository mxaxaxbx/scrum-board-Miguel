const express   = require('express');
const router    = express.Router();

const { login } = require('../controllers/auth.controller');

console.log('\x1b[33m%s\x1b[0m', 'Registring auth routing /api/auth');

console.log('[POST] /login ');
router.post('/login', login);

module.exports = router;
