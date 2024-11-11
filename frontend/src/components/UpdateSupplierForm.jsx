import React, { useState, useEffect } from 'react';
import { updateSupplier } from '../api';

const UpdateSupplierForm = ({ existingSupplier, onSave }) => {
  const [supplier, setSupplier] = useState({
    ...existingSupplier,
    BankingData: existingSupplier.BankingData || [{ bank: '', account_number: '', account_type: '' }],
    BeneficiaryPartners: existingSupplier.BeneficiaryPartners || [{ name_beneficiary: '', id_number_beneficiary: '' }]
  });

  useEffect(() => {
    setSupplier({
      ...existingSupplier,
      BankingData: existingSupplier.BankingData || [{ bank: '', account_number: '', account_type: '' }],
      BeneficiaryPartners: existingSupplier.BeneficiaryPartners || [{ name_beneficiary: '', id_number_beneficiary: '' }]
    });
  }, [existingSupplier]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in supplier.BankingData[0]) {
      setSupplier((prev) => ({
        ...prev,
        BankingData: [{ ...prev.BankingData[0], [name]: value }]
      }));
    } else if (name in supplier.BeneficiaryPartners[0]) {
      setSupplier((prev) => ({
        ...prev,
        BeneficiaryPartners: [{ ...prev.BeneficiaryPartners[0], [name]: value }]
      }));
    } else {
      setSupplier({ ...supplier, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const flattenedData = {
        nit: supplier.nit,
        name: supplier.name,
        lastname: supplier.lastname,
        id_number: supplier.id_number,
        supplier_type: supplier.supplier_type,
        person_type: supplier.person_type,
        validated_by: supplier.validated_by,
        bank: supplier.BankingData[0]?.bank || '',
        account_number: supplier.BankingData[0]?.account_number || '',
        account_type: supplier.BankingData[0]?.account_type || '',
        name_beneficiary: supplier.BeneficiaryPartners[0]?.name_beneficiary || '',
        id_number_beneficiary: supplier.BeneficiaryPartners[0]?.id_number_beneficiary || ''
      };

      await updateSupplier(supplier.id, flattenedData);
      alert("supplier updated")
      onSave();
    } catch (error) {
      console.error("Error updating supplier:", error);
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
      
      <input type="text" name="bank" value={supplier.BankingData[0]?.bank || ''} onChange={handleChange} placeholder="Bank" required />
      <input type="text" name="account_number" value={supplier.BankingData[0]?.account_number || ''} onChange={handleChange} placeholder="Account Number" required />
      <input type="text" name="account_type" value={supplier.BankingData[0]?.account_type || ''} onChange={handleChange} placeholder="Account Type" required />
      
      <input type="text" name="name_beneficiary" value={supplier.BeneficiaryPartners[0]?.name_beneficiary || ''} onChange={handleChange} placeholder="Name Beneficiary" />
      <input type="text" name="id_number_beneficiary" value={supplier.BeneficiaryPartners[0]?.id_number_beneficiary || ''} onChange={handleChange} placeholder="Id Number Beneficiary" />

      <button type="submit">Update Supplier</button>
    </form>
  );
};

export default UpdateSupplierForm;
