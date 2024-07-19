import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`https://dummy.restapiexample.com/api/v1/employees`);
        setEmployees(response.data.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const filteredEmployees = employees.filter((employee) => {
      return employee.id.toString().includes(searchTerm);
    });
    setEmployees(filteredEmployees);
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleDeleteEmployee = (employeeId) => {
    // For this assignment, we only need to remove from the frontend.
    // In a real application, you would send a DELETE request to the API.
    setEmployees(employees.filter((employee) => employee.id !== employeeId));
  };

  const handleSelectEmployee = (employee) => {
    if (selectedEmployees.includes(employee.id)) {
      setSelectedEmployees(selectedEmployees.filter((id) => id !== employee.id));
    } else {
      setSelectedEmployees([...selectedEmployees, employee.id]);
    }
  };

  const handleDeleteSelectedEmployees = () => {
    // For this assignment, we only need to remove from the frontend.
    // In a real application, you would send DELETE requests to the API for each selected employee.
    setSelectedEmployees([]);
    setEmployees(employees.filter((employee) => !selectedEmployees.includes(employee.id)));
  };

  return (
    <div className="App">
      <h1>Employee Dashboard</h1>

      <div className="search-bar">
        <input type="text" placeholder="Search by ID" value={searchTerm} onChange={handleSearchChange} />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="employee-list">
        <h2>Employee List</h2>

        {employees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          <ul>
            {employees.map((employee) => (
              <li key={employee.id} className="employee-card">
                <div>
                  <h3>{employee.employee_name}</h3>
                  <p>Salary: {employee.employee_salary}</p>
                  <p>Age: {employee.employee_age}</p>
                </div>

                <button className="butto" onClick={() => handleEmployeeClick(employee)}>View Details</button>
                <button className="butto" onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
                <button className="butto" onClick={() => handleSelectEmployee(employee)}>Select</button>
              </li>
            ))}
          </ul>
        )}

        {selectedEmployees.length > 0 && (
          <button onClick={handleDeleteSelectedEmployees}>Delete Selected Employees</button>
        )}
      </div>

      {selectedEmployee && (
        <div className="employee-details">
          <h2>Employee Details</h2>

          <div>
            <h3>{selectedEmployee.employee_name}</h3>
            <p>Salary: {selectedEmployee.employee_salary}</p>
            <p>Age: {selectedEmployee.employee_age}</p>
            <p>Profile Image: {selectedEmployee.profile_image}</p>
          </div>

          <button onClick={() => setSelectedEmployee(null)}>Close</button>
        </div>
      )}
    </div>
  );
}
export default App;