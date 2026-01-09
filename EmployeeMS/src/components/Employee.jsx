import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Employee = () => {

  const [employee, setEmployee] = React.useState([])
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch employee data here if needed
    axios.get('http://localhost:3001/auth/employee')
      .then(result => {
        // Handle the result
        if (result.data.status) {
          setEmployee(result.data.result);
        } else {
          alert(result.data.error);
          console.log(result);
        }
      })
      .catch(err => console.log(err));
  }, [])

  const handleDelete = (emp) => () => {
    axios.delete(`http://localhost:3001/auth/delete_employee/${emp.id}`)
      .then(result => {
        if (result.data.status) {
          console.log(result.data);
          setEmployee(employee.filter(e => e.id !== emp.id));
        } else {
          alert(result.data.error);
        }
      })
      .catch(err => console.log(err));
  }
  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className='btn btn-success'>Add Employee</Link>
      <div className='mt-3 '>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              employee.map((emp, index) => (
                <tr key={index}>
                  <td>{emp.name}</td>
                  <td><img src={`http://localhost:3001/images/${emp.image}`} alt="" className='employee_image' /></td>
                  <td>{emp.email}</td>
                  <td>{emp.salary}</td>
                  <td>{emp.address}</td>
                  <td>
                    <Link to={`/dashboard/edit_employee/${emp.id}`} className='btn btn-success'>Edit</Link>
                    <button onClick={handleDelete(emp)} className='btn btn-danger ms-2'>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employee
