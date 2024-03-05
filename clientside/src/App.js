import './App.css';
import Navbar from './components/Navbar';
import Login from "./components/Login";
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddProduct from './components/AddProduct';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/addproduct' element={<AddProduct />} />
      </Routes>
    </>
  );
}

export default App;
