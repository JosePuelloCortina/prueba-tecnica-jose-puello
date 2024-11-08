import { useState } from 'react'
import CreateSupplierForm from './components/CreateSupplierForm';
import UpdateSupplierForm from './components/UpdateSupplierForm';
import SupplierList from './components/SupplierList';
import './App.css'

function App() {
  const [formType, setFormType] = useState(null); 
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const handleCreateClick = () => {
    setFormType('create');
    setSelectedSupplier(null); 
  };

  const handleUpdateClick = (supplier) => {
    setFormType('update');
    setSelectedSupplier(supplier);
  };

  const handleSave = () => {
    setFormType(null); 
    setSelectedSupplier(null); 
  };

  return (
    <div>
      <h1>Supplier Management</h1>

      <button onClick={handleCreateClick}>Create Supplier</button>
      {selectedSupplier && <button onClick={() => handleUpdateClick(selectedSupplier)}>Update Supplier</button>}

      {formType === 'create' && <CreateSupplierForm onSave={handleSave} />}
      {formType === 'update' && selectedSupplier && <UpdateSupplierForm existingSupplier={selectedSupplier} onSave={handleSave} />}

      
      <SupplierList onEdit={(supplier) => handleUpdateClick(supplier)} />
    </div>
  );
}

export default App
