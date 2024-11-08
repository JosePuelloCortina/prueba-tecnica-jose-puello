const { Supplier } = require('../../db');

const updateSupplierState = async (req, res) => {
    try {
        const { supplierId } = req.params;
        const { state } = req.body; 

        if (state !== 'Aprobado' && state !== 'Rechazado') {
            return res.status(400).json({ error: "Invalid state. The state must be either 'Aprobado' or 'Rechazado'." });
        }

        const supplier = await Supplier.findOne({
            where: { id: supplierId }
        });

        if (!supplier) {
            return res.status(404).json({ error: "Supplier not found" });
        }

        supplier.state = state;
        await supplier.save();
        return res.status(200).json(supplier);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating supplier state" });
    }
};

module.exports = updateSupplierState;
