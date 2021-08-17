const express = require('express');
const router  = express.Router();

const { saveTask } = require('../controllers/boards.controller');

console.log('\x1b[33m%s\x1b[0m', 'Registring board routing /api/board');

console.log('[POST] /save/task ');
router.post('/save/task', saveTask);

module.exports = router;
