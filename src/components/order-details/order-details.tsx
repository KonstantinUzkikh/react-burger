import { FC } from 'react';

import { useSelector } from '../../store/hooks-store';
import { h3_type, letters, letters_grey } from '../../utils';
import orderLayout from './order-details.module.css';
import done from '../../images/done.svg'

const OrderDetails: FC = () => {
  const { orderId } = useSelector(state => state.orderDetails);
  return (
    <div className={orderLayout.boxMain}>
      <p className={`text text_type_digits-large`} data-testid={'orderId'} >{orderId}</p>
      <h3 className={`${h3_type} mb-15 mt-8`}>идентификатор заказа</h3>
      <img src={done} alt="заказ принят" className={orderLayout.icon} />
      <p className={`${letters} mb-2 mt-15`}>Ваш заказ начали готовить</p>
      <p className={letters_grey}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails
