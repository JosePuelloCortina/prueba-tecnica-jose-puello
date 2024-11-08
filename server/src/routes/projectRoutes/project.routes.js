const { Router } = require('express');
const jwtAuth = require('../../middlewares/jwtMiddleware');
const getProjects = require('../../controllers/projectController/getProjects');

const router = Router();

router.get('/get-projects', jwtAuth, getProjects)

module.exports = router; 