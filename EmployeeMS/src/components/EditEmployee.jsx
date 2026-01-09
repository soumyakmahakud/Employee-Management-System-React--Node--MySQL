import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {

    const { id } = useParams();
    const [employee, setEmployee] = React.useState({
        name: '',
        email: '',
        salary: '',
        address: '',
        category_id: '',
    });

    const [category, setCategory] = React.useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/auth/category')
            .then(result => {
                if (result.data.status) {
                    setCategory(result.data.result);
                } else {
                    alert(result.data.error);
                }
            })
            .catch(err => console.log(err));

        axios.get(`http://localhost:3001/auth/employee/${id}`)
            .then(result => {
                if (result.data.status) {

                    setEmployee({
                        ...employee,
                        name: result.data.result[0].name,
                        email: result.data.result[0].email,
                        salary: result.data.result[0].salary,
                        address: result.data.result[0].address,
                        category_id: result.data.result[0].category_id,
                    });
                } else {
                    alert(result.data.error);
                }
            })
            .catch(err => console.log(err));
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        // Submit updated employee data logic here
        axios.put(`http://localhost:3001/auth/edit_employee/${id}`, employee)
            .then(result => {
                if (result.data.status) {
                    navigate('/dashboard/employee')
                } else {
                    alert(result.data.error)
                }
            })
            .catch(err => console.log(err))

    }

    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Edit Employee</h3>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label htmlFor="inputName" className="form-label">
                            Employee Name
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputName"
                            placeholder="Enter Name"
                            value={employee.name}
                            onChange={(e) =>
                                setEmployee({ ...employee, name: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputEmail4" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control rounded-0"
                            id="inputEmail4"
                            placeholder="Enter Email"
                            autoComplete="off"
                            value={employee.email}
                            onChange={(e) =>
                                setEmployee({ ...employee, email: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputSalary" className="form-label">
                            Salary
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputSalary"
                            placeholder="Enter Salary"
                            autoComplete="off"
                            value={employee.salary}
                            onChange={(e) =>
                                setEmployee({ ...employee, salary: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputAddress"
                            placeholder="1234 Main St"
                            autoComplete="off"
                            value={employee.address}
                            onChange={(e) =>
                                setEmployee({ ...employee, address: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="category" className="form-label">
                            Category
                        </label>
                        <select name="category" id="category" className="form-select"
                            onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}>
                            {category.map((cat, index) => {
                                return <option key={index} value={cat.id}>{cat.name}</option>;
                            })}
                        </select>
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">
                            Edit Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditEmployee
