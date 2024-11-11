import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getSupplierById = (id) => api.get(`/proveedor/obtener-informacion-proveedor-por-id/${id}`);
export const createSupplier = (supplierData) => api.post('/proveedor/crear-nuevo-proveedor', supplierData);
export const updateSupplier = (id, supplierData) => api.put(`/proveedor/actulizar-informacion-proveedor/${id}`, supplierData);
export const deleteSupplierById = (id) => api.delete(`/proveedor/eliminar-proveedor-por-id/${id}`);
export const updateSupplierState = (id, state) => api.put(`/proveedor/actualizar-estado/${id}`, state);
export const getSuppliers = () => api.get('/proveedor/lista-de-proveedores');
export const createUser = (userData) => api.post('/user/create-user', userData)
export const getUserList = () => api.get('/user/get-user-list'); 

export const getProjects = () => api.get('/projects/get-projects'); 