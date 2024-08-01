
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import { ComplexNavbar } from './components/Navbar/Navbar'
import { useSelector } from "react-redux";

export const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (isLoggedIn) {
    return (
      <Router>
        <div className='flex flex-col w-full justify-center items-center overflow-x-hidden py-2'>
          <div className='flex flex-col w-full'>
            <ComplexNavbar />
          </div>
          <div className='w-full flex flex-col max-xl:px-5 max-w-screen-xl'>
            <Routes>
              <Route path='/dashboard' element={<Home />} />
              <Route path='*' element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className='flex flex-col w-full justify-center items-center overflow-x-hidden py-2'>
        <div className='flex flex-col w-full'>
          <ComplexNavbar />
        </div>
        <div className='w-full flex flex-col max-xl:px-5 max-w-screen-xl'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='*' element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
