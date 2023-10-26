import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { SelectReviews, fetchReviews } from '../../redux/slices/reviewSlice';
import { useAppSelector } from '../../hooks/redux';
import { Status } from '../../models/Status.enum';

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
        <></>
      ) : status === Status.ERROR ? (
        <div>{error}</div>
      ) : !list || list.length > 0 ? (
        <></>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ReviewsList;
