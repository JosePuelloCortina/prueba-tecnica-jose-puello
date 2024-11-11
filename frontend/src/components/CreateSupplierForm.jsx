import React, { useState, useEffect } from 'react';
import { createSupplier, getUserList } from '../api';
import './CreateSupplierForm.css';

const CreateSupplierForm = ({ onSave }) => {
  const [supplier, setSupplier] = useState({
    nit: '', name: '', lastname: '', id_number: '', supplier_type: '', person_type: '',
    validated_by: '', bank: '', account_number: '', account_type: '', name_beneficiary: '', id_number_beneficiary: ''
  });
  const [users, setUsers] = useState([]); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUserList();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createSupplier(supplier);
      alert(`Proveedor creado: ${response.data.name}`); 
      onSave(); 
    } catch (error) {
      console.error("Error creating supplier:", error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred while creating the supplier.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nit" value={supplier.nit} onChange={handleChange} placeholder="Nit" required />
      <input type="text" name="name" value={supplier.name} onChange={handleChange} placeholder="Name" required />
      <input type="text" name="lastname" value={supplier.lastname} onChange={handleChange} placeholder="Lastname" required />
      <input type="text" name="id_number" value={supplier.id_number} onChange={handleChange} placeholder="Id Number" required />
      
      <select name="supplier_type" value={supplier.supplier_type} onChange={handleChange} required>
        <option value="">Select Supplier Type</option>
        <option value="Nacional">Nacional</option>
        <option value="Internacional">Internacional</option>
      </select>
      
      <select name="person_type" value={supplier.person_type} onChange={handleChange} required>
        <option value="">Select Person Type</option>
        <option value="Natural">Natural</option>
        <option value="Juridica">Jurídica</option>
      </select>

      <select name="validated_by" value={supplier.validated_by} onChange={handleChange} required>
        <option value="">Select Validator</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.email}
          </option>
        ))}
      </select>

      <input type="text" name="bank" value={supplier.bank} onChange={handleChange} placeholder="Bank" required />
      <input type="text" name="account_number" value={supplier.account_number} onChange={handleChange} placeholder="Account Number" required />
      <input type="text" name="account_type" value={supplier.account_type} onChange={handleChange} placeholder="Account Type" required />
      <input type="text" name="name_beneficiary" value={supplier.name_beneficiary} onChange={handleChange} placeholder="Name Beneficiary" />
      <input type="text" name="id_number_beneficiary" value={supplier.id_number_beneficiary} onChange={handleChange} placeholder="Id Number Beneficiary" />

      <button type="submit">Create Supplier</button>
    </form>
  );
};

export default CreateSupplierForm;
