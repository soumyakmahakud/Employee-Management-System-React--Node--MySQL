
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Employee from './components/Employee';
import Category from './components/Category';
import Profile from './components/Profile';
import AddCategory from './components/AddCategory';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/adminlogin" element={<Login />} ></Route>
          <Route path="/dashboard" element={<Dashboard />} >
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
