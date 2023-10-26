import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './scss/app.scss';
import './scss/admin.scss';

import NotFound from './pages/NotFound';
import Profile from './pages/User/Profile/EditProfile';
import Main from './pages/User/Main';
import Catalog from './pages/User/Catalog';
import Brands from './pages/User/Brands';
import About from './pages/User/About';
import Projects from './pages/User/Projects';
import Cart from './pages/User/Cart';
import './App.css';
import { SelectIsAuth, checkAuth } from './redux/slices/authSlice';
import { useAppDispatch } from './redux/store';
import { useAppSelector } from './hooks/redux';
import AdminHome from './pages/Admin/Home';
import AdminMainSlider from './pages/Admin/MainSlider';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import CategoriesAdmin from './pages/Admin/Categories';
import CreateGood from './pages/Admin/Goods/Create';
import GoodsAdmin from './pages/Admin/Goods';
import BrandsAdmin from './pages/Admin/Brands';
import GoodPage from './pages/User/GoodPage';

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
      <Routes location={location} key={location.pathname}>
        <Route
          path='/admin'
          element={
            <RequireAdmin redirectTo={'/'}>
              <AdminLayout />
            </RequireAdmin>
          }>
          <Route path='' element={<AdminHome />}></Route>
          <Route path='sliders/main-slider' element={<AdminMainSlider />}></Route>
          <Route path='categories' element={<CategoriesAdmin />}></Route>
          <Route path='brands' element={<BrandsAdmin />}></Route>
          <Route path='goods'>
            <Route path='' element={<GoodsAdmin />}></Route>
            <Route path='create' element={<CreateGood />}></Route>
          </Route>
          <Route path='*' element={<NotFound link='/admin' />}></Route>
        </Route>
        <Route path='/' element={<MainLayout />}>
          <Route path='' element={<Main />}></Route>
          <Route path='catalog' element={<Catalog />}></Route>
          <Route path='goods'>
            <Route path=':id' element={<GoodPage />}></Route>
          </Route>
          <Route path='about' element={<About />}></Route>
          <Route path='brands' element={<Brands />}></Route>
          <Route path='projects' element={<Projects />}></Route>
          <Route
            path='profile'
            element={
              <RequireAuth redirectTo={'/'}>
                <Profile />
              </RequireAuth>
            }></Route>
          <Route path='cart' element={<Cart />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Route>
      </Routes>
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
