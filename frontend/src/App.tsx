import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './scss/app.scss';

import NotFound from './pages/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';

import Profile from './pages/User/Profile/EditProfile';
import Main from './pages/User/Main';
import Catalog from './pages/User/Catalog';
import Brands from './pages/User/Brands';
import Contacts from './pages/User/Contacts';
import About from './pages/User/About';
import Projects from './pages/User/Projects';
import Cart from './pages/User/Cart';
import './App.css';
import { SelectIsAuth, checkAuth } from './redux/slices/authSlice';
import { useAppDispatch } from './redux/store';
import { useAppSelector } from './hooks/redux';
import AdminHome from './pages/Admin/Home';
import AdminMainSlider from './pages/Admin/MainSlider';

function App() {
  const location = useLocation();
  const login: boolean = false;
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);

  return (
    <>
      <Header auth={login} />

      <div className='main'>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Main />}></Route>
          <Route path='/catalog' element={<Catalog />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/brands' element={<Brands />}></Route>
          <Route path='/contacts' element={<Contacts />}></Route>
          <Route path='/projects' element={<Projects />}></Route>
          <Route
            path='/profile'
            element={
              <RequireAuth redirectTo={'/'}>
                <Profile />
              </RequireAuth>
            }></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route
            path='/admin'
            element={
              <RequireAdmin redirectTo={'/'}>
                <AdminHome />
              </RequireAdmin>
            }></Route>
          <Route
            path='/admin/main-slider'
            element={
              <RequireAdmin redirectTo={'/'}>
                <AdminMainSlider />
              </RequireAdmin>
            }></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </div>

      <Footer />
    </>
  );
}

function RequireAuth({ children, redirectTo }) {
  const isAuth = useAppSelector(SelectIsAuth);
  return isAuth ? children : <Navigate to={redirectTo} />;
}

function RequireAdmin({ children, redirectTo }) {
  const role = localStorage.getItem('role');
  return role === 'ADMIN' ? children : <Navigate to={redirectTo} />;
}

export default App;
