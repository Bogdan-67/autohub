import React, { ChangeEvent, useRef, useState } from 'react';
import Input from '../../../components/common/Input';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';
import { ISlider } from '../../../models/ISlider';
import SliderService from '../../../services/SliderService';
import styles from './MainSlider.module.scss';

type Props = {};

const AdminMainSlider = (props: Props) => {
  const [inputData, setInputData] = useState<Partial<ISlider>>({});
  const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const btnRef = useRef<HTMLButtonElement>();

  let formData = new FormData();

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files) {
      formData.append('img', e.target.files[0]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    for (let key in inputData) {
      formData.append(key, inputData[key]);
    }
    console.log(formData);
    try {
      await SliderService.createSliderItem(formData);
      setIsOpenCreate(false);
    } catch (error) {
      setError(error.response.data.message);
      alert(error.response.data.message);
    } finally {
      if (btnRef.current) {
        btnRef.current.blur();
      }
      setIsLoading(false);
      formData = new FormData();
      setInputData({});
      const fileInput: HTMLInputElement = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = '';
      }
    }
  };

  return (
    <>
      <div>
        <h1>Редактирование главного слайдера</h1>
        <div>
          <Button onClick={() => setIsOpenCreate(true)}>Добавить элемент</Button>
        </div>
      </div>
      <Modal isActive={isOpenCreate} setIsActive={setIsOpenCreate}>
        <form className={styles.createForm} onSubmit={handleSubmit}>
          <h2 className={styles.createForm__title}>Добавление элемента</h2>
          <input
            type='text'
            placeholder='Заголовок'
            value={inputData.title}
            onChange={(e) => setInputData({ ...inputData, title: e.target.value })}
          />
          <Input
            type='text'
            placeholder='Подпись'
            value={inputData.description}
            onChange={(e) => setInputData({ ...inputData, description: e.target.value })}
          />
          <div className={styles.createForm__imgUpload}>
            <p className={styles.createForm__text}>Задний фон</p>
            <input type='file' placeholder='Изображение' onChange={handleFile} />
          </div>
          {error && <div>{error}</div>}
          <Button
            ref={btnRef}
            disabled={!inputData.title || !formData}
            type='submit'
            loading={isLoading}>
            Создать
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default AdminMainSlider;
