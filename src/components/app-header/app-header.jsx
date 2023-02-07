import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import { Logo, BurgerIcon, ListIcon, ProfileIcon, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import headerLayout from './app-header.module.css'

const Icon = ({content, type}) => {
  switch (content) {
    case "burger": return ( <BurgerIcon type={type} /> );
    case "list": return ( <ListIcon type={type} /> );
    case "profile": return ( <ProfileIcon type={type} /> );
    default: return ('Ошибка: отсутствует контент');
  }
}

Icon.propTypes = {
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

const ButtonHeader = ({content, isActive, ...props }) => {

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
      <span className={`${style} text text_type_main-default ml-2`}>
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

    return (
    <header className= {`${headerLayout.boxMain} mb-4 mt-4`}>
      <nav className={headerLayout.nav}>
        <ButtonHeader content="burger" isActive={true}>Конструктор</ButtonHeader>
        <ButtonHeader content="list" isActive={false}>Лента заказов</ButtonHeader>
      </nav>
      <div className={headerLayout.logo}>
        <Logo />
      </div>
      <ButtonHeader content="profile" isActive={false}>Личный кабинет</ButtonHeader>
    </header>
  );
}

export default AppHeader
