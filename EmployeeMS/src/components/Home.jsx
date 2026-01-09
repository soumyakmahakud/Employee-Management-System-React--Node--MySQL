import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0)
  const [employeeTotal, setemployeeTotal] = useState(0)
  const [salaryTotal, setSalaryTotal] = useState(0)
  const [admins, setAdmins] = useState([])

  useEffect(() => {
    adminCount()
    employeeCount()
    salaryCount()
    AdminRecords()
  }, [])

  const AdminRecords = () => {
    axios.get('http://localhost:3001/auth/admin_records')
      .then(result => {
        if (result.data.status) {
          setAdmins(result.data.result)
        } else {
          alert(result.data.error)
        }
      })
  }

  const adminCount = () => {
    axios.get('http://localhost:3001/auth/admin_count')
      .then(result => {
        if (result.data.status) {
          setAdminTotal(result.data.result[0].admin)
        }
      })
  }

  const employeeCount = () => {
    axios.get('http://localhost:3001/auth/employee_count')
      .then(result => {
        if (result.data.status) {
          setemployeeTotal(result.data.result[0].employee)
        }
      })
  }

  const salaryCount = () => {
    axios.get('http://localhost:3001/auth/salary_count')
      .then(result => {
        if (result.data.status) {
          setSalaryTotal(result.data.result[0].salaryOFEmp)
        }
      })
  }

  return (
    <div className="container-fluid">

      {/* ===== DASHBOARD CARDS ===== */}
      <div className="row mt-3 g-3 text-center">

        <div className="col-12 col-md-4">
          <div className="p-3 border shadow-sm rounded">
            <h4>Admin</h4>
            <hr />
            <h5>Total: {adminTotal}</h5>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="p-3 border shadow-sm rounded">
            <h4>Employee</h4>
            <hr />
            <h5>Total: {employeeTotal}</h5>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="p-3 border shadow-sm rounded">
            <h4>Salary</h4>
            <hr />
            <h5>₹ {salaryTotal}</h5>
          </div>
        </div>

      </div>

      {/* ===== ADMIN TABLE ===== */}
      <div className="mt-4 px-2 px-md-5 pt-3">
        <h3 className="text-center text-md-start">List of Admins</h3>

        <div className="table-responsive">
          <table className="table table-bordered table-hover mt-3">
            <thead className="table-light">
              <tr>
                <th>Email</th>
                <th style={{ width: "160px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {admins.map(a => (
                <tr key={a.id}>
                  <td>{a.email}</td>
                  <td>
                    <Link to={`/dashboard/edit_admin/${a.id}`} className='btn btn-success'>Edit</Link>
                    <button  className='btn btn-danger ms-2'>Delete</button>
                  </td>
                </tr>
              ))}
              {admins.length === 0 && (
                <tr>
                  <td colSpan="2" className="text-center">

                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default Home
