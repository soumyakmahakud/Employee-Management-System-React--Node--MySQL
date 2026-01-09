import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Category = () => {

  const [category, setCategory] = useState([]);

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
  }, [])

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Category List</h3>
      </div>
      <Link to="/dashboard/add_category" className='btn btn-success'>Add Category</Link>
      <div className='mt-3 '>
        <table className='table'>
          <thead>
            <tr><th>Category Name</th></tr>
          </thead>
          <tbody>
            {
              category.map((cat, index) => (
                <tr key={index}>
                  <td>{cat.name}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Category
