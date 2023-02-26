import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { readUserData } from '../../utils/cookies';

export default function ProtectedRoute({ children, anonymous = false }) {

  const location = useLocation();

  const { email } = readUserData();
  const isLoggedIn = email !== undefined;

  const from = location.state?.from || '/';

  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isLoggedIn) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={ from } />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isLoggedIn) {
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location}}/>;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return children;
}
