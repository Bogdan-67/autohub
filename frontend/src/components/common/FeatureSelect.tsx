import React, { useState, useRef, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button } from 'antd';
import type { InputRef } from 'antd';
import GoodService from '../../services/GoodService';

type Props = {
  selectedFeature: string;
  setSelectedFeature: (value: string) => void;
};

const FeatureSelect: React.FC<Props> = ({ selectedFeature, setSelectedFeature }) => {
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewFeature(event.target.value);
  };

  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    setFeatures([...features, newFeature]);
    setNewFeature('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const fetchFeatures = async () => {
    await GoodService.getFeatures().then((response) => {
      setFeatures(response.data);
    });
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  return (
    <Select
      style={{ width: 300 }}
      placeholder='Название'
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input
              placeholder='Новая характеристика'
              ref={inputRef}
              value={newFeature}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type='text' icon={<PlusOutlined />} onClick={addItem}>
              Добавить
            </Button>
          </Space>
        </>
      )}
      options={features.map((item) => ({ label: item, value: item }))}
      onChange={(value) => setSelectedFeature(value)}
    />
  );
};

export default FeatureSelect;
