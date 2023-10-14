import React, { useEffect, useState } from 'react';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import CategoriesList from '../../../components/common/CategoriesList';
import Input from '../../../components/common/Input';
import SelectBar from '../../../components/common/SelectBar';
import { IOption } from '../../../models/IOption';
import { useAppSelector } from '../../../hooks/redux';
import {
  SelectCategories,
  SelectCategoriesList,
  createCategory,
} from '../../../redux/slices/categoriesSlice';
import styles from './CategoriesAdmin.module.scss';
import { Status } from '../../../models/Status.enum';
import { useAppDispatch } from '../../../redux/store';

type Props = {};

const CategoriesAdmin = (props: Props) => {
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>('');
  const [parentCategory, setParentCategory] = useState<IOption>({ label: null, value: null });
  const [categoriesOptions, setCategoriesOptions] = useState<IOption[]>([]);
  const categories = useAppSelector(SelectCategoriesList);
  const { status, error } = useAppSelector(SelectCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (categories)
      setCategoriesOptions(
        categories.map((category) => ({ label: category.name, value: category.id_category })),
      );
  }, [categories]);

  const handleCreate = () => {
    if (categoryName)
      dispatch(
        createCategory({
          name: categoryName,
          parent: parentCategory.value,
        }),
      ).then((_) => {
        setIsCreateOpen(false);
        setCategoryName('');
      });
  };

  return (
    <>
      <h1 className='admin-title'>Категории товаров</h1>
      <CategoriesList />
      <Button className={styles.createBtn} onClick={() => setIsCreateOpen(true)}>
        Создать
      </Button>
      <Modal isActive={isCreateOpen} setIsActive={setIsCreateOpen}>
        <div className={styles.create}>
          <h2 className={styles.create__title}>Создание категории</h2>
          <Input
            className={styles.create__name}
            type='text'
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder='Название'
          />
          <SelectBar
            className={styles.create__parent}
            placeholder='Родительская категория'
            value={parentCategory}
            options={categoriesOptions}
            setSelected={setParentCategory}
            emptyMessage='Категория не найдена'
          />
          <Button
            loading={status === Status.LOADING}
            className={styles.create__btn}
            disabled={!categoryName}
            onClick={() => handleCreate()}>
            Создать
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CategoriesAdmin;
