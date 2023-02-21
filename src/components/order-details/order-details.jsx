import React from 'react';
//import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// eslint-disable-next-line no-unused-vars
import { CheckMarkIcon, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import { h3_type, letters, letters_grey } from '../../utils/types.js';
import orderLayout from './order-details.module.css';
import done from '../../images/done.svg'

function OrderDetails() {
  const { orderId } = useSelector(state => state.orderDetails);
  return (
    <div className={orderLayout.boxMain}>
      <p className={`text text_type_digits-large`}>{orderId}</p>
      <h3 className={`${h3_type} mb-15 mt-8`}>идентификатор заказа</h3>
      <img src={done} alt="заказ принят" className={orderLayout.icon} />
      <p className={`${letters} mb-2 mt-15`}>Ваш заказ начали готовить</p>
      <p className={letters_grey}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

//Галочка из библиотеки не подходит под контекст по внешнему виду и размеру
//<div className={orderLayout.icon} ><CheckMarkIcon type="primary" /></div>
//Взял рисунок из фигмы
//<img src={done} alt="заказ принят" className={orderLayout.icon} />

export default OrderDetails
