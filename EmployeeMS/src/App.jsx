
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import { BrowserRouter, Router, Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Employee from './components/Employee';
import Category from './components/Category';
import Profile from './components/Profile';
import AddCategory from './components/AddCategory';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import Start from './components/Start';
import EmployeeLogin from './components/EmployeeLogin';
import EmployeeDashboard from './components/EmployeeDashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} ></Route>
          <Route path="/adminlogin" element={<Login />} ></Route>
          <Route path="/employee_login" element={<EmployeeLogin />} ></Route>
          <Route path="/employee_dashboard/:id" element={<EmployeeDashboard />} ></Route>
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} >
            <Route path='' element={<Home />}></Route>
            <Route path='employee' element={<Employee />}></Route>
            <Route path='category' element={<Category />}></Route>
            <Route path='profile' element={<Profile />}></Route>
            <Route path='add_category' element={<AddCategory />}></Route>
            <Route path='add_employee' element={<AddEmployee />}></Route>
            <Route path='edit_employee/:id' element={<EditEmployee />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
