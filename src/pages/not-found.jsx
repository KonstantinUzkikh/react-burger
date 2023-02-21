import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { openModal } from '../services/actions/modal';

function NotFound() {

  const dispatch = useDispatch();
  const msg = 'Ошибка 404\nCтраница не существует';

  dispatch(openModal(msg, 'undefinde'));

  return <Navigate to="/" replace/>
}

export default NotFound;
