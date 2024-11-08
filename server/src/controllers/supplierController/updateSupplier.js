const { Supplier, BankingData, User, BeneficiaryPartner } = require('../../db');
const Sequelize = require('sequelize');
const validateRequiredFields = require('../../utils/validateRequiredFields');

const updateSupplier = async (req, res) => {
    try {
        const { supplierId } = req.params;  
        const { nit, name, lastname, id_number, supplier_type, person_type, state, validated_by, bank, account_number, account_type, name_beneficiary, id_number_beneficiary } = req.body;

        const errorMessage = validateRequiredFields(req.body, ['nit', 'name', 'lastname', 'id_number', 'supplier_type', 'person_type', 'validated_by', 'bank', 'account_number', 'account_type', 'name_beneficiary', 'id_number_beneficiary']);
        if (errorMessage) {
            return res.status(400).json({ error: `Error updating supplier: Bad request, ${errorMessage}` });
        }

        const validatingUser = await User.findOne({
            where: { id: validated_by }
        });

        if (!validatingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        if (validatingUser.role !== 'admin') {
            return res.status(403).json({ error: "Only an admin user can validate suppliers" });
        }

        const existingSupplier = await Supplier.findOne({
            where: { id: supplierId }
        });

        if (!existingSupplier) {
            return res.status(404).json({ error: "Supplier not found" });
        }

        const duplicateSupplier = await Supplier.findOne({
            where: {
                [Sequelize.Op.and]: [
                    {
                        [Sequelize.Op.or]: [
                            { nit: nit },
                            { id_number: id_number }
                        ]
                    },
                    {
                        id: { [Sequelize.Op.ne]: supplierId }  
                    }
                ]
            }
        });

        if (duplicateSupplier) {
            return res.status(409).json({ message: "A supplier with this NIT or ID number already exists" });
        }

        const updatedSupplier = await existingSupplier.update({
            nit,
            name,
            lastname,
            id_number,
            supplier_type,
            person_type,
            state,
            validated_by
        });

        const existingBankingData = await BankingData.findOne({
            where: { supplier_id: supplierId }
        });

        if (!existingBankingData) {
            return res.status(404).json({ error: "Banking data not found for this supplier" });
        }

        const existingBeneficiaryPartne = await BeneficiaryPartner.findOne({
            where: { supplier_id: supplierId}
        })

        if (!existingBeneficiaryPartne) {
            return res.status(404).json({ error: "Beneficiary Partner not found for this supplier" });
        }

        const updatedBankingData = await existingBankingData.update({
            bank,
            account_number,
            account_type
        });

        const updateBeneficiaryPartner = await existingBeneficiaryPartne.update({
            name_beneficiary,
            id_number_beneficiary
        })
        return res.status(200).json({ supplier: updatedSupplier, bankingData: updatedBankingData, beneficiaryPartner: updateBeneficiaryPartner });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating supplier" });
    }
};

module.exports = updateSupplier;
