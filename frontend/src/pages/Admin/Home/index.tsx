import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/common/Button';

type Props = {};

const AdminHome = (props: Props) => {
  return (
    <div>
      <h1>Администрирование</h1>
      <Link to={'/admin/main-slider'}>
        <Button>Главный слайдер</Button>
      </Link>
    </div>
  );
};

export default AdminHome;
