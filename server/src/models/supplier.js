const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Supplier', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
            allowNull: false
        },
        nit: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        id_number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        supplier_type : {
            type: DataTypes.ENUM(['Nacional', 'Internacional']),
            allowNull: false
        },
        person_type: {
            type: DataTypes.ENUM(['Natural', 'Juridica']),
            allowNull: false
        },
        state: {
            type: DataTypes.ENUM(['Pendiente de Validación', 'Aprobado', 'Rechazado']),
            defaultValue: "Pendiente de validacion"
        },
        validated_by: {
            type: DataTypes.UUID,
            allowNull: true
        }
    })
}