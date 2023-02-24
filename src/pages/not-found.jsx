import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { openModal } from '../services/actions/modal';

function NotFoundPage() {

  const dispatch = useDispatch();

  dispatch(openModal('', 'error404'));

  return <Navigate to="/" replace/>
}

export default NotFoundPage;
