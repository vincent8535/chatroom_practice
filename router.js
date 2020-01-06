const express = require('express');
const router = express.Router();
const AccountController = require('./controller/accountController')
var multer  = require('multer')
var upload = multer()

router.get('/', AccountController.index);
router.get('/chatroom', AccountController.chatroom);
router.get('/logout', AccountController.logout);
router.get('/member', AccountController.backstage);
router.post('/login',upload.array(), AccountController.login);
router.post('/regist',upload.array(), AccountController.regist);
router.post('/member', upload.array(), AccountController.add);
router.put('/member',upload.array(), AccountController.update);
router.delete('/member',upload.array(), AccountController.erase);
module.exports = router;