import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import SelectBar, { Option } from './SelectBar';
import { SelectCategoriesList, fetchCategories } from '../../redux/slices/categoriesSlice';
import { IOption } from '../../models/IOption';

type Props = {
  className?: string;
  placeholder?: string;
  emptyMessage?: string;
  categoryId: number;
  setCategoryId: (id: number) => void;
};

const CategoriesSelectBar: FC<Props> = ({
  categoryId,
  setCategoryId,
  placeholder,
  emptyMessage,
  className,
}) => {
  const [parentCategory, setParentCategory] = useState<IOption>({ label: null, value: null });
  const [categoriesOptions, setCategoriesOptions] = useState<IOption[]>([]);
  const categories = useAppSelector(SelectCategoriesList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (categories)
      setCategoriesOptions(
        categories.map((category) => ({ label: category.name, value: category.id_category })),
      );
  }, [categories]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleSelect = (option: Option) => {
    setParentCategory(option);
    setCategoryId(option && option.value ? option.value : null);
  };

  return (
    <SelectBar
      className={className}
      placeholder={placeholder || 'Категория'}
      value={parentCategory}
      options={categoriesOptions}
      setSelected={(option) => handleSelect(option)}
      emptyMessage={emptyMessage || 'Категория не найдена'}
    />
  );
};

export default CategoriesSelectBar;
