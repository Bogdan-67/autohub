import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import SelectBar, { Option } from './SelectBar';
import { SelectCategoriesList, fetchCategories } from '../../redux/slices/categoriesSlice';
import { IOption } from '../../models/IOption';
import { SelectBrandsList, fetchBrands } from '../../redux/slices/brandsSlice';

type Props = {
  className?: string;
  placeholder?: string;
  emptyMessage?: string;
  brandId: number;
  setBrandId: (id: number) => void;
};

const BrandsSearchBar: FC<Props> = ({
  brandId,
  setBrandId,
  placeholder,
  emptyMessage,
  className,
}) => {
  const [parentBrand, setParentBrand] = useState<IOption>({ label: null, value: null });
  const [brandsOptions, setBrandsOptions] = useState<IOption[]>([]);
  const brands = useAppSelector(SelectBrandsList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (brands)
      setBrandsOptions(brands.map((brand) => ({ label: brand.name, value: brand.id_brand })));
  }, [brands]);

  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  useEffect(() => {
    if (brandId === null || brandId === 0) {
      setParentBrand({ label: null, value: null });
    } else {
      if (brands) {
        const brand = brands.find((brand) => brand.id_brand === brandId);
        if (brand) {
          setParentBrand({
            label: brand.name,
            value: brand.id_brand,
          });
        }
      }
    }
  }, [brandId]);

  const handleSelect = (option: Option) => {
    setParentBrand(option);
    setBrandId(option && option.value ? option.value : null);
  };

  return (
    <SelectBar
      className={className}
      placeholder={placeholder || 'Бренд'}
      value={parentBrand}
      options={brandsOptions}
      setSelected={(option) => handleSelect(option)}
      emptyMessage={emptyMessage || 'Бренд не найден'}
    />
  );
};

export default BrandsSearchBar;
