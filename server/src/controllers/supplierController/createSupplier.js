const { Supplier, BankingData, User } = require('../../db');
const Sequelize = require('sequelize');
const validateRequiredFields = require('../../utils/validateRequiredFields');

const createSupplier = async (req, res) => {
    try {
        const { nit, name, lastname, id_number, supplier_type, person_type, state, validated_by, bank, account_number, account_type } = req.body;

        const errorMessage = validateRequiredFields(req.body, ['nit', 'name', 'lastname', 'id_number', 'supplier_type', 'person_type', 'validated_by', 'bank', 'account_number', 'account_type']);
        if (errorMessage) {
            return res.status(400).json({ error: `Error creating supplier: Bad request, ${errorMessage}` });
        }

        const existingSupplier = await Supplier.findOne({
            where: {
                [Sequelize.Op.or]: [
                    { nit: nit },
                    { id_number: id_number }
                ]
            }
        });

        if (existingSupplier) {
            return res.status(409).json({ message: "A supplier with this NIT or ID number already exists" });
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

        const newSupplier = {
            nit,
            name,
            lastname,
            id_number,
            supplier_type,
            person_type,
            state, 
            validated_by
        };
        const createdSupplier = await Supplier.create(newSupplier);

        const newBankingData = {
            supplier_id: createdSupplier.id,
            bank,
            account_number,
            account_type
        };
        const createdBankingData = await BankingData.create(newBankingData);

        return res.status(201).json({ supplier: createdSupplier, bankingData: createdBankingData });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating supplier" });
    }
};

module.exports = createSupplier;
