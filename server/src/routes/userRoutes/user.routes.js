const { Router } = require('express');
const createUser = require('../../controllers/userController/createUser');
const getUserList = require('../../controllers/userController/getUserList');

const router = Router();

router.post('/create-user', createUser);
router.get('/get-user-list', getUserList)

module.exports = router; 
