import { FC } from 'react';
import Header from '../../components/Headers/Main';
import Footer from '../../components/Footer';
import { Outlet } from 'react-router';

const MainLayout: FC = () => {
  return (
    <>
      <Header />

      <div className='main'>
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default MainLayout;
