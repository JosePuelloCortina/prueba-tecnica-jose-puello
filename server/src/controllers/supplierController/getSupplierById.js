const { Supplier, BankingData, BeneficiaryPartner } = require('../../db');

const getSupplierById = async (req, res) => {
    try {
        const { supplierId } = req.params;

        const supplier = await Supplier.findOne({
            where: { id: supplierId },
            include: [
                { model: BankingData },
                { model: BeneficiaryPartner }
            ] 
        });

        if (!supplier) {
            return res.status(404).json({ error: "Supplier not found" });
        }

        return res.status(200).json(supplier);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching supplier information" });
    }
};

module.exports = getSupplierById;