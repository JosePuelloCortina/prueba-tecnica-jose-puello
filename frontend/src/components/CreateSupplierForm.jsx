import React, { useState } from 'react';
import { createSupplier } from '../api';
import './CreateSupplierForm.css';

const CreateSupplierForm = ({ onSave }) => {
  const [supplier, setSupplier] = useState({
    nit: '', name: '', lastname: '', id_number: '', supplier_type: '', person_type: '',
    validated_by: '', bank: '', account_number: '', account_type: '', name_beneficiary: '', id_number_beneficiary: ''
  });

  const handleChange = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSupplier(supplier);
      onSave();
    } catch (error) {
      console.error("Error creating supplier:", error);
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

      <input type="text" name="validated_by" value={supplier.validated_by} onChange={handleChange} placeholder="Validated By" />
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
