const express = require('express');
const router  = express.Router();
// Controller
const roleController = require('../controllers/role.controller');
// Middleware
const auth = require('../middleware/auth');
const validateUser = require('../middleware/validateUser');
const admin = require('../middleware/admin');

console.log('\x1b[33m%s\x1b[0m', 'Registring roles routing /api/roles');

console.log('[POST] MW /register ');
router.post('/register', auth, validateUser, admin, roleController.register);

console.log('[GET] MW /list ');
router.get('/list/', auth, validateUser, admin, roleController.list);

console.log('[PUT] MW /update ');
router.put('/update', auth, validateUser, admin, roleController.update);

console.log('[DELETE] MW /delete ');
router.delete('/delete/:id', auth, validateUser, admin, roleController.delete_);

module.exports = router;
