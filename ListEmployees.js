import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditEmployee = ({ employee, onUpdate }) => {
  const [firstName, setFirstName] = useState(employee.firstName);
  const [lastName, setLastName] = useState(employee.lastName);

  const handleSubmit = () => {
    axios.put(`http://localhost:5001/api/employees/${employee.id}`, {
      firstName,
      lastName,
    })
      .then(() => {
        console.log('Employee updated successfully');
        onUpdate(); // Notify the parent component to refresh the employee list
      })
      .catch((error) => {
        console.error('Error updating employee:', error);
      });
  };

  return (
    <div className="container">
    <h2>Edit Employee</h2>
    <div className="mb-3">
      <input
        type="text"
        className="form-control form-control-sm" // Use form-control-sm for smaller input boxes
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
    </div>
    <div className="mb-3">
      <input
        type="text"
        className="form-control form-control-sm" // Use form-control-sm for smaller input boxes
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
    </div>
    <button className="btn btn-primary" onClick={handleSubmit}>
      Update
    </button>
  </div>
  );
};

const ListEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const fetchEmployees = () => {
    axios.get('http://localhost:5001/api/employees')
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []); // Empty dependency array ensures this runs only once

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
  };

  const handleUpdate = () => {
    setEditingEmployee(null);
    fetchEmployees(); // Refresh the employee list
  };

  const handleDeleteClick = (employee) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      axios.delete(`http://localhost:5001/api/employees/${employee.id}`)
        .then(() => {
          console.log('Employee deleted successfully');
          fetchEmployees(); // Refresh the employee list
        })
        .catch((error) => {
          console.error('Error deleting employee:', error);
        });
    }
  };

  return (
<div className="container">
  <h2>List of Employees</h2>
  <ul className="list-group">
    {employees.map((employee) => (
      <li key={employee.id} className="list-group-item d-flex justify-content-between align-items-center">
        <span>
          {employee.firstName} {employee.lastName}
        </span>
        <div>
          <button className="btn btn-primary btn-sm ms-2" onClick={() => handleEditClick(employee)}>Edit</button>
          <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDeleteClick(employee)}>Delete</button>
        </div>
      </li>
    ))}
  </ul>
  {editingEmployee && (
    <EditEmployee employee={editingEmployee} onUpdate={handleUpdate} />
  )}
</div>

  );
};
export default ListEmployees;