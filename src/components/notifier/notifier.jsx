import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import { Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import { loadingMessages } from '../../utils/constants';
import { resetRequest } from '../../services/actions/api';
import notifierLayout from './notifier.module.css';

function Notifier() {

  const Notification = ({ title, notification, isClosed, ...props }) => {

    const dispatch = useDispatch();

    const comment = 'Чтобы закрыть уведомление,\nнажмите Esc или кликните мышкой.';

    const onClose = () => isClosed && dispatch(resetRequest());

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
            {isClosed && <p>{comment}</p>}
          </div>
        </div>
      </div>
    )
  }

  Notification.propTypes = {
    title: PropTypes.string,
    notification: PropTypes.string,
    isClosed: PropTypes.bool,
    children: PropTypes.string
  };

  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState({});
  const { source, isLoading, hasError, hasMessage, errorMsg, successMsg } = useSelector(state => state.api);

  let loadingMsg;

  source === '' ? loadingMsg = '' : loadingMsg = loadingMessages.filter(item => item.source === source)[0].loadingMsg;

  const notificationsNew = [
    { isFlag: isLoading, title: 'Ожидайте', notification: `${loadingMsg}`, isClosed: false },
    { isFlag: hasError, title: 'Что-то пошло не так...', notification: `${errorMsg}`, isClosed: true },
    { isFlag: hasMessage, title: 'Ответ сервера:', notification: `${successMsg}`, isClosed: true }
  ]

  useEffect(() => {
    setIsOpen(isLoading || hasError);
    setNotification(notificationsNew.find((item) => { return item.isFlag }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, hasError]);

  return (
    <>
      {isOpen && ReactDOM.createPortal(
        <Notification
          title={notification.title}
          notification={notification.notification}
          isClosed={notification.isClosed}
        />,
        document.getElementById('notifier')
      )}
    </>
  )
}

export default Notifier
