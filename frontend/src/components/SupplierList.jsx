import React from 'react';
import { updateSupplierState } from '../api';
import './SupplierList.css';

const SupplierList = ({ suppliers, onEdit, onDelete }) => {
  const handleUpdateState = async (id, newState) => {
    try {
      await updateSupplierState(id, { state: newState });
      await location.reload()
    } catch (error) {
      console.error("Error updating supplier state:", error);
    }
  };

  return (
    <div>
      <h2>Suppliers List</h2>
      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier.id}>
            {supplier.name} - {supplier.id_number} - Estado: {supplier.state}
            <button onClick={() => onEdit(supplier)}>Edit</button>
            <button onClick={() => onDelete(supplier.id)}>Delete</button>
            {supplier.state === 'Pendiente de Validación' && (
              <>
                <button onClick={() => handleUpdateState(supplier.id, 'Aprobado')}>Aprobar</button>
                <button onClick={() => handleUpdateState(supplier.id, 'Rechazado')}>Rechazar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierList;
