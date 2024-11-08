const { Supplier, BankingData, BeneficiaryPartner } = require('../../db');

const getSuppliersList = async (req, res) => {
    try {
        const suppliers = await Supplier.findAll({
            include: [
                { model: BankingData },
                { model: BeneficiaryPartner }
            ] 
        });
        return res.status(200).json(suppliers);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error retrieving suppliers list" });
    }
};

module.exports = getSuppliersList;