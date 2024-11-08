const { Router } = require('express'); 
const userRoutes = require('./userRoutes/user.routes');
const projectRoutes = require('./projectRoutes/project.routes');
const supplierRoutes = require('./supplierRoutes/supplier.routes');

const router = Router(); 

router.use('/user', userRoutes);
router.use('/projects', projectRoutes);
router.use('/proveedor', supplierRoutes)

module.exports = router; 