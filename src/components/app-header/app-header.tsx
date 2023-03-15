import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { checkLogin } from '../../utils/utils';
import { letters } from '../../utils/types';
import headerLayout from './app-header.module.css'

const Icon: FC<{ content: 'burger' | 'list' | 'profile'; type: 'primary' | 'secondary'}> = ({ content, type }) => {
  switch (content) {
    case "burger": return (<BurgerIcon type={type} />);
    case "list": return (<ListIcon type={type} />);
    case "profile": return (<ProfileIcon type={type} />);
    default: return <></>;
  }
}

const ButtonHeader: FC<{ content: 'burger' | 'list' | 'profile'; isActive: boolean; children?: string }> =
  ({ content, isActive, children }) => {

  let type: 'primary' | 'secondary', style: string;
  if (isActive) {
    type = "primary";
    style = `${headerLayout.primary}`;
  } else {
    type = "secondary";
    style = ''
  }

  return (
    <button type="button" className={headerLayout.button}>
      <Icon content={content} type={type} />
      <span className={`${style} ${letters} ml-2`}>
        {children}
      </span>
    </button>
  )
}

function AppHeader() {

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onConstructor = () => {
    navigate('/');
  };

  const onOrders = () => {
    navigate('/feed');
  };

  const onLogin = () => {
    checkLogin() ? navigate('/profile') : navigate('/login');
  };

  return (
    <header className={`${headerLayout.boxMain} mb-4 mt-4`}>
      <nav className={headerLayout.nav}>
        <div onClick={onConstructor}>
          <ButtonHeader content="burger" isActive={pathname === '/'}>Конструктор</ButtonHeader>
        </div>
        <div onClick={onOrders}>
          <ButtonHeader content="list" isActive={pathname === '/feed'}>Лента заказов</ButtonHeader>
        </div>
      </nav>
      <div className={headerLayout.logo} onClick={() => navigate('/')} >
        <Logo />
      </div>
      <div onClick={onLogin}>
        <ButtonHeader content="profile" isActive={pathname === '/login'}>Личный кабинет</ButtonHeader>
      </div>
    </header>
  );
}

export default AppHeader
