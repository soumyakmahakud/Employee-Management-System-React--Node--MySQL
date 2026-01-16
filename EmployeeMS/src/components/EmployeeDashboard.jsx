import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeDashboard = () => {
    const { id } = useParams();

    const [employeeData, setEmployeeData] = React.useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/employee/employee_data/' + id)
            .then(response => {
                setEmployeeData(response.data.result[0]);
                console.log(response.data.result[0]);

            })
            .catch(error => {
                console.error("Error fetching employee data:", error);
            });
    }, [id]);

    const handleLogout = () => {
        axios.get('http://localhost:3001/employee/logout')
            .then(response => {
                localStorage.removeItem('employeeLoggedIn');
                navigate('/');
            })
            .catch(error => {
                console.error("Error during logout:", error);
            });
    }

    

    return (
        <div>
            <div className='p-2 d-flex justify-content-center shadow'>
                <h4>Employee Dashboard</h4>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center m-4 p-4 border rounded shadow' >
                <img src={'http://localhost:3001/Images/' + employeeData.image} alt="" className=' employee_image_large' />
                <div className='d-flex flex-column align-items-center mt-3 mb-3'>
                    <h5>Welcome, {employeeData.name}</h5>
                    <p><strong>Email:</strong> {employeeData.email}</p>
                    <p><strong>Salary:</strong> {employeeData.salary}</p>
                    <p><strong>category:</strong> {employeeData.category}</p>
                </div>
                <div>
                    <button className='btn btn-primary me-2'>Edit Profile</button>
                    <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    )
}
export default EmployeeDashboard
