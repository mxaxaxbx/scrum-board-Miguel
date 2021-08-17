const express = require('express');
const router = express.Router();
// Controller
const { list, register } = require('../controllers/users.controller');
// Middleware
const auth = require('../middleware/auth');
const validateUser = require('../middleware/validateUser');

console.log('\x1b[33m%s\x1b[0m', 'Registring users routing /api/users');

console.log('[POST] /register ');
router.post('/register', register);

console.log('[GET] MW /list ');
router.get('/list/:name?', auth, validateUser, list);

module.exports = router;
