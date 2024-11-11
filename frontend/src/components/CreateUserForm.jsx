import React, { useState } from "react";
import { createUser } from "../api";
import './CreateSupplierForm.css';

const CreateUserForm = ({ onSave }) => {
    const [user, setUser] = useState({
        username: '', email: '', password: '', role: ''
    }); 

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }; 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createUser(user);
            console.log(response.data.id) 
            alert(`usuario creado con id: ${response.data.id}`, ); 
            onSave();  
        } catch (error) {
            console.error("Error creating user: ", error);
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message); 
            } else {
                alert("An error occurred while creating the user.");
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="Username" required />
            <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" required />
            <select name="role" value={user.role} onChange={handleChange} required>
                <option value="">Select User Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
            </select>
            <button type="submit">Create User</button>
        </form>
    )
}; 

export default CreateUserForm;