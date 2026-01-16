import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

const Start = () => {
    const navigate = useNavigate(); 

  useEffect(() => {
    axios.get('http://localhost:3001/verifyuser')
      .then(response => {
        if(response.data.status){
          if(response.data.role === 'admin'){
            navigate('/dashboard');
          }
          else if(response.data.role === 'employee'){
            navigate('/employee_dashboard/' + response.data.id);
          }
        } else {
          navigate('/');
        }
      })
      .catch(error => {
        console.error("There was an error connecting to the server!", error);
      });
  }, []);

  return (
      <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                
                <h2 className='text-center'>Login As</h2>
                <div className='mb-3 d-grid gap-2 mt-3'>
                    <button className='btn btn-success w-100 rounded mb-2' onClick={()=>{navigate('/adminlogin')}}>Admin</button>
                    <button className='btn btn-success w-100 rounded mb-2' onClick={()=>{navigate('/employee_login')}}>Employee</button>
                </div>
            </div>
        </div>
  )
}

export default Start
