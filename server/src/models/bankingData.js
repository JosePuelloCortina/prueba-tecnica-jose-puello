const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('BankingData', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
            allowNull: false
        },
        supplier_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        bank: {
            type: DataTypes.STRING,
            allowNull: false
        },
        account_number: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        account_type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};