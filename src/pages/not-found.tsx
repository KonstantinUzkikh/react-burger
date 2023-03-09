import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { useDispatch } from '../store/hooks';
import { openModal } from '../store/actions/modal';

const NotFoundPage: FC = () => {

  const dispatch = useDispatch();

  dispatch(openModal('', 'error404'));

  return <Navigate to="/" replace/>
}

export default NotFoundPage;
