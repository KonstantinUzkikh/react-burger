import { FC, ReactElement } from 'react';
import { Navigate, useLocation, NavigateProps, Location } from 'react-router-dom';

import { checkLogin } from '../../utils';

const ProtectedRoute: FC<{ children: ReactElement; anonymous?: boolean }> =
  ({ children, anonymous = false }): ReactElement<NavigateProps> =>
  {
    const location: Location = useLocation();

    const from: string = location.state?.from || '/';

    // Если разрешен неавторизованный доступ, а пользователь авторизован...
    if (anonymous && checkLogin()) {
      // ...то отправляем его на предыдущую страницу
      return <Navigate to={from} />;
    }

    // Если требуется авторизация, а пользователь не авторизован...
    if (!anonymous && !checkLogin()) {
      // ...то отправляем его на страницу логин
      return <Navigate to="/login" state={{ from: location }} />;
    }

    // Если все ок, то рендерим внутреннее содержимое
    return children;
  }

export default ProtectedRoute
