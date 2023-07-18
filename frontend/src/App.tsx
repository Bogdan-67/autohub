import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './scss/app.scss';
import Header from './components/Header';
import Login from './pages/Login';
import Registr from './pages/Registr';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';

function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <div className='content'>
        <Routes location={location} key={location.pathname}>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/registration' element={<Registr />}></Route>
          <Route path='/' element={<Profile />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
