import { FC } from 'react';
import AdminSidebar from './AdminSidebar';
import styles from './AdminLayout.module.scss';
import Header from '../../components/Headers/Main';
import { Outlet } from 'react-router';
import AdminHeader from '../../components/Headers/Admin';

const AdminLayout: FC = () => {
  return (
    <div className={styles.page}>
      <AdminHeader />
      <div className={styles.wrapper}>
        <AdminSidebar />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
