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
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id_number: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    });
};