import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import { Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import orderLayout from './order-details.module.css';
import done from '../../images/done.svg'

function OrderDetails({order}) {
  return (
    <div className={orderLayout.box}>
      <p className="text text_type_digits-large" >{order}</p>
      <p className="text text_type_main-medium mb-15 mt-8">идентификатор заказа</p>
      <img src={done} alt="заказ принят" className={orderLayout.icon} />
      <p className="text text_type_main-default mb-2 mt-15">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive" >Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

OrderDetails.propTypes = {
  order: PropTypes.string
};

export default OrderDetails
