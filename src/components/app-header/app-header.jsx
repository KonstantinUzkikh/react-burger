import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import { Logo, BurgerIcon, ListIcon, ProfileIcon, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import { readUserData } from '../../utils/cookies';
import { letters } from '../../utils/types.js';
import headerLayout from './app-header.module.css'

const Icon = ({ content, type }) => {
  switch (content) {
    case "burger": return (<BurgerIcon type={type} />);
    case "list": return (<ListIcon type={type} />);
    case "profile": return (<ProfileIcon type={type} />);
    default: return ('Ошибка: отсутствует контент');
  }
}

Icon.propTypes = {
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

const ButtonHeader = ({ content, isActive, ...props }) => {

  let type, style;
  if (isActive) {
    type = "primary";
    style = `${headerLayout.primary}`;
  } else {
    type = "secondary";
    style = ''
  }

  return (
    <button href='#' type="button" className={headerLayout.button}>
      <Icon content={content} type={type} />
      <span className={`${style} ${letters} ml-2`}>
        {props.children}
      </span>
    </button>
  )
}

ButtonHeader.propTypes = {
  content: PropTypes.string.isRequired,
  isActive: PropTypes.bool
};

function AppHeader() {

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { email} = readUserData();
  const isLoggedIn = email !== undefined;

  const onConstructor = () => {
    navigate('/');
  };

  const onOrders = () => {
    navigate('/orders'); // УТОЧНИТЬ ПУТЬ ПОСЛЕ ДОРАБОТКИ ФУНКЦИОНАЛА
  };

  const onLogin = () => {
    isLoggedIn ? navigate('/profile') : navigate('/login');
  };

  return (
    <header className={`${headerLayout.boxMain} mb-4 mt-4`}>
      <nav className={headerLayout.nav}>
        <div onClick={onConstructor}>
          <ButtonHeader content="burger" isActive={pathname === '/'}>Конструктор</ButtonHeader>
        </div>
        <div onClick={onOrders}>
          <ButtonHeader content="list" isActive={pathname === '/order-list'}>Лента заказов</ButtonHeader>
        </div>
      </nav>
      <div className={headerLayout.logo}>
        <Logo />
      </div>
      <div onClick={onLogin}>
        <ButtonHeader content="profile" isActive={pathname === '/login'}>Личный кабинет</ButtonHeader>
      </div>
    </header>
  );
}

export default AppHeader
