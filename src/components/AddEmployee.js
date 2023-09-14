// src/components/AddEmployee.js
import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = () => {
    axios.post('http://localhost:5001/api/employees', { firstName, lastName })

      .then(() => {
        console.log('Employee added successfully');
        setFirstName('');
        setLastName('');
      })
      .catch((error) => {
        console.error('Error adding employee:', error);
      });
  };

  return (
<div className="container mt-5">
      <h2>Add Employee</h2>
      <form>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
