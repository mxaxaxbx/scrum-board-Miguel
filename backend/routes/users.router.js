const express = require('express');
const router = express.Router();

const { list, register } = require('../controllers/users.controller');

console.log('\x1b[33m%s\x1b[0m', 'Registring users routing /api/users');

console.log('[POST] /register ');
router.post('/register', register);

console.log('[GET] /list ');
router.get('/list/:name?', list);

module.exports = router;
