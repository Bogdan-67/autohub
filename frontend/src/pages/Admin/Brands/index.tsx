import classNames from 'classnames';
import React from 'react';
import Button from '../../../components/common/Button';
import CreateBrandModal from '../../../components/Modals/CreateBrand';

type Props = {};

const BrandsAdmin = (props: Props) => {
  return (
    <>
      <h1 className='admin-title'>Редактирование брендов</h1>
      <CreateBrandModal />
    </>
  );
};

export default BrandsAdmin;
