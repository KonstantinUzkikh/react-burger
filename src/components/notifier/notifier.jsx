import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import { Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import notifierLayout from './notifier.module.css';

function Notifier() {

  function Notification({title, notification, ...props}) {
    return(
      <div className={notifierLayout.overlay}>
      <div className={notifierLayout.boxMain} >
        <div className={notifierLayout.children}>
          {title !== undefined && <p>{title}</p>}
          {notification !== undefined && <p>{notification}</p>}
          {props.children !== undefined && <p>{props.children}</p>}
        </div>
      </div>
    </div>
    )
  }

  Notification.propTypes = {
    title: PropTypes.string,
    notification: PropTypes.string,
    children: PropTypes.string
  };

  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState({});

  const { isLoadingIngredients, hasErrorIngredients, errorIngredients } = useSelector(state => state.ingredients);
  const { isLoadingСonfirmation, hasErrorСonfirmation, errorOrder } = useSelector(state => state.orderDetails);

  const notifications = [
    { isOpen: isLoadingIngredients, notification: `Загружаем доступные ингредиенты...` },
    { isOpen: hasErrorIngredients, title: 'Произошла ошибка.', notification: `${errorIngredients}` },
    { isOpen: isLoadingСonfirmation, title: 'Ожидайте.', notification: 'Оформляем заказ...' },
    { isOpen: hasErrorСonfirmation, title: 'Произошла ошибка.', notification: `${errorOrder}` },
  ];

  useEffect(() => {
    setIsOpen(isLoadingIngredients || hasErrorIngredients || isLoadingСonfirmation || hasErrorСonfirmation);
    setNotification(notifications.find((item) => {return item.isOpen}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingIngredients, hasErrorIngredients, isLoadingСonfirmation, hasErrorСonfirmation]);

  return (
    <>
    {isOpen && ReactDOM.createPortal(
      <Notification title={notification.title} notification={notification.notification}/>,
      document.getElementById('notifier')
    )}
    </>
  )
}

export default Notifier
