const express = require('express');
const router = express.Router();
const AccountController = require('./controller/accountController')


router.get('/', AccountController.index);
router.get('/chatroom', AccountController.chatroom);
router.get('/logout', AccountController.logout);
router.get('/member', AccountController.backstage);
router.post('/login', AccountController.login);
router.post('/regist', AccountController.regist);
router.post('/member', AccountController.add);
router.put('/member', AccountController.update);
router.delete('/member', AccountController.erase);
module.exports = router;