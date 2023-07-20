import { Route, Routes, useLocation } from 'react-router-dom';
import './scss/app.scss';

import NotFound from './pages/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';

import Registr from './pages/Registr';
import Profile from './pages/Profile';
import Main from './pages/Main';
import Catalog from './pages/Catalog';
import Brands from './pages/Brands';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import About from './pages/About';
import Projects from './pages/Projects';
import Cart from './pages/Cart';

function App() {
  const location = useLocation();
  const login: boolean = false;
  return (
    <>
      <Header login={login} />
      <div className='content'>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Main />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/registration' element={<Registr />}></Route>
          <Route path='/catalog' element={<Catalog />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/brands' element={<Brands />}></Route>
          <Route path='/contacts' element={<Contacts />}></Route>
          <Route path='/projects' element={<Projects />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
