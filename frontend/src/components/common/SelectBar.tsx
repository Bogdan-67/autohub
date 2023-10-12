import React, { FC } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

type Props = {
  setSelected: (value) => void;
  isMulti?: boolean;
  isClearable?: boolean;
  placeholder: string;
  emptyMessage?: string;
  options: Option[];
  disabled?: boolean;
  value: Option | Option[];
  className?: string;
};

export type Option = {
  label: string;
  value: any;
};

const SelectBar: FC<Props> = ({
  setSelected,
  value,
  isMulti,
  isClearable,
  placeholder,
  emptyMessage,
  options,
  disabled,
  className,
}) => {
  //get animated components wrapper
  const animatedComponents = makeAnimated();

  return (
    <>
      <Select
        className={className}
        classNamePrefix={' '}
        placeholder={placeholder}
        noOptionsMessage={() => (emptyMessage ? emptyMessage : 'Нет данных')}
        isDisabled={disabled || false}
        isMulti={isMulti || false}
        isClearable={isClearable || true}
        components={animatedComponents}
        getOptionLabel={(e: Option) => e.label}
        getOptionValue={(e: Option) => e.value}
        onChange={(value) => setSelected(value)}
        options={options}
      />
    </>
  );
};

export default SelectBar;
