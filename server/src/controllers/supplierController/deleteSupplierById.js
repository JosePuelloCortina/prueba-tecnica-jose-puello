const { Supplier, BankingData, BeneficiaryPartner } = require('../../db');

const deleteSupplierById = async (req, res) => {
    try {
        const { supplierId } = req.params; 

        const supplier = await Supplier.findOne({
            where: { id: supplierId },
            include: {
                model: BankingData, BeneficiaryPartner,
                required: false, 
            }
        });

        if (!supplier) {
            return res.status(404).json({ error: "Supplier not found" });
        }

        await supplier.destroy();

        return res.status(200).json({ message: "Supplier and related data successfully deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error deleting supplier and related data" });
    }
};

module.exports = deleteSupplierById;
