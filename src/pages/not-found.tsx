import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { openModal } from '../services/actions/modal';

const NotFoundPage: FC = () => {

  const dispatch = useDispatch();

  dispatch(openModal('', 'error404'));

  return <Navigate to="/" replace/>
}

export default NotFoundPage;
