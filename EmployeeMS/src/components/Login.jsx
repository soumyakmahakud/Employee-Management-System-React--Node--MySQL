import React, { useState } from 'react'
import './style.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(values);
        axios.post('http://localhost:3001/auth/adminlogin', values)
        .then(result => {
            if(result.data.loginStatus){
            navigate('/dashboard');
            } else {
                setError(result.data.error);
            }
        })
        .catch(err =>{
            console.log(err);
            setError(err.response.data.error)
        } )
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <div className='text-warning mb-3'>
                    {error && error}

                </div>
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email">Email:</label>
                        <input onChange={(e)=>setValues({...values, email: e.target.value})} type="email" name="email" autoComplete='off' placeholder='Enter Email' className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Password:</label>
                        <input onChange={(e)=>setValues({...values, password: e.target.value})} type="password" name="password" placeholder='Enter Password' className='form-control rounded-0' />
                    </div>
                    <button type="submit" className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
                    <div className='mb-1'>
                        <input type="checkbox" className='me-2' id='tick' name='tick' />
                        <label htmlFor='password'>You are Agree with terms & conditions</label>
                        </div>
                </form>
            </div>
        </div>
    )
}

export default Login
