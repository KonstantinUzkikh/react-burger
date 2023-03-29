import { FC, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useDispatch } from '../store/hooks-store';
import { error } from '../store/actions';

const NotFoundPage: FC = () => {

  const dispatch = useDispatch();

  useEffect (() => {
    dispatch(error('Ошибка 404: cтраница не существует'));
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  return <Navigate to="/" replace/>
}

export default NotFoundPage;
