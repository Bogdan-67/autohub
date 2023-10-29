import { Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { IFeedback } from '../../../../models/IFeedback';
import FeedbackService from '../../../../services/FeedbackService';
import styles from './Feedbacks.module.scss';
import Modal from '../../../../components/common/Modal';
import Button from '../../../../components/common/Button';

type Props = {};

const FeedbacksAdmin = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>(null);
  const [activeFeedback, setActiveFeedback] = useState<IFeedback>(null);
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>(null);

  const columns = [
    {
      title: 'Пользователь',
      dataIndex: 'user',
      key: 'user',
      render: (user, record) => (
        <div>
          {record.user_id
            ? `${record.name} ${record.surname}`
            : 'Незарегистрированный пользователь'}
        </div>
      ),
    },
    {
      title: 'Дата',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => <div>{new Date(date).toLocaleDateString('ru-RU')}</div>,
    },
    {
      title: 'Сообщение',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Контакты',
      dataIndex: 'contacts',
      key: 'contacts',
    },
    {
      title: 'Действия',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button
            onClick={() => {
              setActiveFeedback(record);
              setIsOpen(true);
            }}>
            Просмотреть
          </Button>
          <a>Удалить</a>
        </Space>
      ),
    },
  ];

  const getFeedbacks = async () => {
    setIsLoading(true);
    await FeedbackService.fetchFeedbacks()
      .then((response) => {
        setIsError(null);
        setFeedbacks(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        setIsError(e.response ? e.response.data.message : e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getFeedbacks();
  }, []);

  return (
    <>
      <section className={styles.feedbacks}>
        <h1 className='admin-title'>Обратная связь от пользователей</h1>
        <Table style={{ width: '100%' }} dataSource={feedbacks} columns={columns} />
      </section>
      {activeFeedback && (
        <Modal isActive={isOpen} setIsActive={setIsOpen}>
          <div className={styles.modal}>
            <h3>
              {activeFeedback.name && activeFeedback.surname
                ? `${activeFeedback.name} ${activeFeedback.surname}`
                : 'Неизвестный пользователь'}
            </h3>
            <p>
              <span>Сообщение:</span> {activeFeedback.message}
            </p>
            <p>
              <span>Контакты:</span> {activeFeedback.contacts}
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default FeedbacksAdmin;
