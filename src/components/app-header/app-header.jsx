import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import { Logo, BurgerIcon, ListIcon, ProfileIcon, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import headerLayout from './app-header.module.css'

function ButtonHeader({content, type}) {
  let  isActive = false

  if (type === "primary") { isActive = true}

  switch (content) {
    case "burger":
      return (
        <button href='#' type="button" className={headerLayout.button}>
          <BurgerIcon type={type} />
          {isActive
          ? (<span className="text text_type_main-default ml-2" style={{ color: '#F2F2F3' }}>
              Конструктор
            </span>
            )
          : (<span className="text text_type_main-default ml-2">
              Конструктор
            </span>
            )
          }
        </button>
      )
    case "list":
      return (
        <button href='#' type="button" className={headerLayout.button}>
          <ListIcon type={type} />
          {isActive
          ? (<span className="text text_type_main-default ml-2" style={{ color: '#F2F2F3' }}>
              Лента заказов
            </span>
            )
          : (<span className="text text_type_main-default ml-2">
              Лента заказов
            </span>
            )
          }
        </button>
      )
    case "profile":
      return (
        <button href='#' type="button" className={headerLayout.button}>
          <ProfileIcon type={type} />
          {isActive
          ? (<span className="text text_type_main-default ml-2" style={{ color: '#F2F2F3' }}>
              Личный кабинет
            </span>
            )
          : (<span className="text text_type_main-default ml-2">
              Личный кабинет
            </span>
            )
          }
        </button>
      )
    default:
      break;
  }
}

ButtonHeader.propTypes = {
  content: PropTypes.string.isRequired,
  type: PropTypes.string
};

function AppHeader() {

    return (
    <div className={headerLayout.header}>
      <nav className={headerLayout.nav}>
        <ButtonHeader content="burger" type="primary" />
        <ButtonHeader content="list" type="secondary" />
      </nav>
      <div className={headerLayout.icon}>
        <Logo />
      </div>
      <ButtonHeader content="profile" type="secondary" />
    </div>
  );
}

export default AppHeader
