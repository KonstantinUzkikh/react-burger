import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import { Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import { cancelProfileState } from '../../services/actions/profile';
import notifierLayout from './notifier.module.css';

function Notifier() {

  const Notification = ({ title, notification, comment, onCancel, ...props }) => {

    const dispatch = useDispatch();

    const onClose = () => onCancel !== undefined && dispatch(onCancel());

    useEffect(() => {
      const escCloseModal = (evt) => evt.key === 'Escape' && onClose();
      document.addEventListener('keydown', escCloseModal);
      return () => {
        document.removeEventListener('keydown', escCloseModal)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div className={notifierLayout.overlay} onClick={onClose}>
        <div className={notifierLayout.boxMain} >
          <div className={notifierLayout.children}>
            {title !== undefined && <p>{title}</p>}
            {notification !== undefined && <p>{notification}</p>}
            {props.children !== undefined && <p>{props.children}</p>}
            {comment !== undefined && <p>{comment}</p>}
          </div>
        </div>
      </div>
    )
  }

  Notification.propTypes = {
    title: PropTypes.string,
    notification: PropTypes.string,
    comment: PropTypes.string,
    onCancel: PropTypes.func,
    children: PropTypes.string
  };

  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState({});

  const { isLoadingIngredients, hasErrorIngredients, errorIngredients } = useSelector(state => state.ingredients);
  const { isLoadingСonfirmation, hasErrorСonfirmation, errorOrder } = useSelector(state => state.orderDetails);
  const { isLoadingProfile, hasErrorProfile, errorProfile } = useSelector(state => state.profile);

  const notifications = [
    { isFlag: isLoadingIngredients, notification: `Загружаем доступные ингредиенты...` },
    { isFlag: hasErrorIngredients, title: 'Произошла ошибка.', notification: `${errorIngredients}` },
    { isFlag: isLoadingСonfirmation, title: 'Ожидайте.', notification: 'Оформляем заказ...' },
    { isFlag: hasErrorСonfirmation, title: 'Произошла ошибка.', notification: `${errorOrder}` },
    { isFlag: isLoadingProfile, notification: 'Личный кабинет...' },
    {
      isFlag: hasErrorProfile,
      title: 'Что-то пошло не так...',
      notification: `${errorProfile}`,
      comment: 'Чтобы закрыть уведомление,\nнажмите Esc или кликните мышкой.',
      onCancel: cancelProfileState
    },
  ];

  useEffect(() => {
    setIsOpen(
      isLoadingIngredients || hasErrorIngredients || isLoadingСonfirmation || hasErrorСonfirmation ||
      isLoadingProfile || hasErrorProfile
    );
    setNotification(notifications.find((item) => { return item.isFlag }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isLoadingIngredients, hasErrorIngredients, isLoadingСonfirmation, hasErrorСonfirmation,
    isLoadingProfile, hasErrorProfile
  ]);

  return (
    <>
      {isOpen && ReactDOM.createPortal(
        <Notification
          title={notification.title}
          notification={notification.notification}
          comment={notification.comment}
          onCancel={notification.onCancel}
        />,
        document.getElementById('notifier')
      )}
    </>
  )
}

export default Notifier
