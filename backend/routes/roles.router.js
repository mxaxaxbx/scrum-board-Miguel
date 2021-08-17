const express = require('express');
const router = express.Router();

const { register, list } = require('../controllers/roles.controller');

console.log('\x1b[33m%s\x1b[0m', 'Registring roles routing /api/roles');

console.log('[POST] /register ');
router.post('/register', register);

console.log('[GET] /list ');
router.get('/list/', list);

module.exports = router;
