const { Router } = require('express');
const createSupplier = require('../../controllers/supplierController/createSupplier');
const updateSupplier = require('../../controllers/supplierController/updateSupplier');
const getSupplierById = require('../../controllers/supplierController/getSupplierById');
const deleteSupplierById = require('../../controllers/supplierController/deleteSupplierById');
const updateSupplierState = require('../../controllers/supplierController/updateSupplierState');

const router = Router();

router.post('/crear-nuevo-proveedor', createSupplier);
router.put('/actulizar-informacion-proveedor/:supplierId', updateSupplier);
router.get('/obtener-informacion-proveedor-por-id/:supplierId', getSupplierById);
router.delete('/eliminar-proveedor-por-id/:supplierId', deleteSupplierById);
router.put('/actualizar-estado/:supplierId', updateSupplierState);

module.exports = router; 