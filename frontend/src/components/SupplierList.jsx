import React, { useEffect, useState } from 'react';
import { getSuppliers, deleteSupplierById } from '../api';
import './SupplierList.css';

const SupplierList = ({ onEdit }) => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await getSuppliers();
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSupplierById(id);
      fetchSuppliers(); 
    } catch (error) {
      console.error("Error deleting supplier:", error);
    }
  };

  return (
    <div>
      <h2>Suppliers List</h2>
      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier.id}>
            {supplier.name} - {supplier.id_number}
            <button onClick={() => onEdit(supplier)}>Edit</button>
            <button onClick={() => handleDelete(supplier.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierList;
