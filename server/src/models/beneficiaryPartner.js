const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('BeneficiaryPartner', {
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
        name_beneficiary: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id_number_beneficiary: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    });
};