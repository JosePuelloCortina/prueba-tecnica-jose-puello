import { useState, useEffect } from 'react';
import CreateSupplierForm from './components/CreateSupplierForm';
import UpdateSupplierForm from './components/UpdateSupplierForm';
import CreateUserForm from './components/CreateUserForm';
import SupplierList from './components/SupplierList';
import { getSuppliers } from './api';
import './App.css';

function App() {
  const [formType, setFormType] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      const response = await getSuppliers();
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers: ", error);
    }
  };

  const handleCreateSupplierClick = () => {
    setFormType('createSupplier');
    setSelectedSupplier(null);
  };

  const handleCreateUserClick = () => {
    setFormType('createUser');
  };

  const handleUpdateClick = (supplier) => {
    setFormType('updateSupplier');
    setSelectedSupplier(supplier);
  };

  const handleSave = async () => {
    await loadSuppliers(); 
    setFormType(null);
    setSelectedSupplier(null);
  };

  return (
    <div>
      <h1>Supplier Management</h1>

      <button onClick={handleCreateSupplierClick}>Create Supplier</button>
      <button onClick={handleCreateUserClick}>Create User</button>
      {selectedSupplier && <button onClick={() => handleUpdateClick(selectedSupplier)}>Update Supplier</button>}

      {formType === 'createSupplier' && <CreateSupplierForm onSave={handleSave} />}
      {formType === 'updateSupplier' && selectedSupplier && <UpdateSupplierForm existingSupplier={selectedSupplier} onSave={handleSave} />}
      {formType === 'createUser' && <CreateUserForm onSave={handleSave} />}

      <SupplierList suppliers={suppliers} onEdit={(supplier) => handleUpdateClick(supplier)} />
    </div>
  );
}

export default App;
