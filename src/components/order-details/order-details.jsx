import React from 'react';
//import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// eslint-disable-next-line no-unused-vars
import { CheckMarkIcon, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import orderLayout from './order-details.module.css';
import done from '../../images/done.svg'

function OrderDetails() {
  const { orderId } = useSelector(state => state.orderDetails);
  return (
    <div className={orderLayout.boxMain}>
      <p className="text text_type_digits-large" >{orderId}</p>
      <p className="text text_type_main-medium mb-15 mt-8">идентификатор заказа</p>
      <img src={done} alt="заказ принят" className={orderLayout.icon} />
      <p className="text text_type_main-default mb-2 mt-15">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive" >Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

//Галочка из библиотеки не подходит под контекст по внешнему виду и размеру
//<div className={orderLayout.icon} ><CheckMarkIcon type="primary" /></div>
//Взял рисунок из фигмы
//<img src={done} alt="заказ принят" className={orderLayout.icon} />

export default OrderDetails
