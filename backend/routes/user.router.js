const express = require('express');

const router = express.Router();
//controller
const { list, register, registerAdmin, updateUser, deleteUser } = require('../controllers/user.controller');
// middleware
const auth = require('../middleware/auth');
const validateUser = require('../middleware/validateUser');
const admin = require("../middleware/admin");

console.log('\x1b[33m%s\x1b[0m', 'Registring user routing /api/users');

console.log('[POST] /register ');
router.post('/register', register);

console.log('[POST] MW /register/admin ');
router.post("/register/admin", auth, validateUser, admin, registerAdmin);

console.log('[GET] MW /list ');
router.get('/list/:name?', auth, validateUser, list);

console.log('[PUT] MW /update ');
router.put("/update", auth, validateUser, admin, updateUser);

console.log('[DELETE] MW /delete ');
router.put("/delete", auth, validateUser, admin, deleteUser)

module.exports = router;
