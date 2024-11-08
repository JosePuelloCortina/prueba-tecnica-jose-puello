const { Router } = require('express');
const createUser = require('../../controllers/userController/createUser');

const router = Router();

router.post('/create-user', createUser);

module.exports = router; 
