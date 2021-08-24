const express = require('express');
const router  = express.Router();
// controller
const {
    saveTask,
    listTask,
    updateTask,
    deleteTask,
    saveTaskImg
} = require('../controllers/board.controller');
// Middleware
const auth         = require('../middleware/auth');
const validateUser = require('../middleware/validateUser');
const upload       = require('../middleware/file');

const multiparty = require('connect-multiparty');

const mult = multiparty();

console.log('\x1b[33m%s\x1b[0m', 'Registring board routing /api/board');

console.log('[POST] MW /save/task ');
router.post('/save/task', auth, validateUser, saveTask);

console.log('[POST] MW /save/task/img ');
router.post('/save/task/img', mult, upload, auth, validateUser, saveTaskImg);

console.log('[GET] MW /list ');
router.get('/list', auth, validateUser, listTask);

console.log('[PUT] MW /update ');
router.put('/update', auth, validateUser, updateTask);

console.log('[DELETE] MW /delete ');
router.delete('/delete/:_id', auth, validateUser, deleteTask);

module.exports = router;
