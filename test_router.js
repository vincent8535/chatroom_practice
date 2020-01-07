const express = require('express');
const router = express.Router();
const testController = require('./controller/testController');

router.get('/test_login', testController.testlogin);
router.get('/test_regist', testController.testregist);
router.get('/test_update', testController.testupdate);
router.get('/test_delete', testController.testdelete);
module.exports = router;