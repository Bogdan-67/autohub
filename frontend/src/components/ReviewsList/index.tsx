import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { SelectReviews, fetchReviews } from '../../redux/slices/reviewSlice';
import { useAppSelector } from '../../hooks/redux';
import { Status } from '../../models/Status.enum';
import { Card, List } from 'antd';
import ReviewTitle from './ReviewTitle';
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner';
import styles from './Review.module.scss';

type Props = {
  good_id: number;
  user_id?: number;
};

const ReviewsList = ({ good_id, user_id }: Props) => {
  const { status, error, list } = useAppSelector(SelectReviews);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (good_id || user_id) {
      dispatch(fetchReviews({ good_id, user_id }));
    }
  }, []);

  return (
    <div>
      {status === Status.LOADING ? (
        <div>
          <LoadingSpinner size={30} color='#e8e8e8' />
        </div>
      ) : status === Status.ERROR ? (
        <div>{error}</div>
      ) : !list || list.length === 0 ? (
        <div>Нет отзывов</div>
      ) : (
        // TODO: Сделать бесконечную подгрузку либо пагинацию
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={list}
          renderItem={(review) => (
            <List.Item>
              <Card
                title={<ReviewTitle {...review} />}
                extra={
                  <span className={styles.review__date}>
                    {new Date(review.created_at).toLocaleDateString('ru-RU')}
                  </span>
                }>
                {review.text}
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default ReviewsList;
