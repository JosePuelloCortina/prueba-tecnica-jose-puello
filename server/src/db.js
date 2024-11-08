const { Sequelize } = require("sequelize");
const dotenv = require('dotenv').config();

const {
    DB_NAME, DB_USER, DB_PASSWORD,
} = process.env;

const sequelize = new Sequelize(
    `${DB_NAME}`,
    `${DB_USER}`,
    `${DB_PASSWORD}`, {
        host: 'localhost',
        dialect: 'mysql'
    }
);
const defineUser = require('./models/user');
const defineSupplier = require('./models/supplier');
const defineBeneficiary = require('./models/beneficiaryPartner');
const defineBankingData = require('./models/bankingData');

defineUser(sequelize);
defineSupplier(sequelize);
defineBeneficiary(sequelize);
defineBankingData(sequelize);

const { User, Supplier, BeneficiaryPartner, BankingData } = sequelize.models; 

User.hasMany(Supplier, { foreignKey: 'validated_by' }); 
Supplier.belongsTo(User, { foreignKey: 'validated_by' });

Supplier.hasMany(BeneficiaryPartner, { foreignKey: 'supplier_id', onDelete: 'CASCADE', }); 
BeneficiaryPartner.belongsTo(Supplier, { foreignKey: 'supplier_id' }); 

Supplier.hasMany(BankingData, { foreignKey: 'supplier_id', onDelete: 'CASCADE', });
BankingData.belongsTo(Supplier, { foreignKey: 'supplier_id' });

module.exports = {
    User,
    Supplier,
    BeneficiaryPartner,
    BankingData,
    conn: sequelize,
}; 