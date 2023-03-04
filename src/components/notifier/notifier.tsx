import { useEffect, useState, FC } from 'react';
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from 'react-redux';

import { loadingMessages } from '../../utils/constants';
import { resetRequest } from '../../services/actions/api';
import notifierLayout from './notifier.module.css';

const Notifier: FC = () => {

  const Notification: FC<{ title?: string; notification?: string; isClosed?: boolean; children?: string }> =
    ({ title, notification, isClosed, children }) => {

    const dispatch = useDispatch();

    const comment = 'Чтобы закрыть уведомление,\nнажмите Esc или кликните мышкой.';

    const onClose = () => isClosed && dispatch(resetRequest());

    useEffect(() => {
      const escCloseModal = (evt: KeyboardEvent) => evt.key === 'Escape' && onClose();
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
            {children !== undefined && <p>{children}</p>}
            {isClosed && <p>{comment}</p>}
          </div>
        </div>
      </div>
    )
  }

  type TNotification = { isFlag: boolean; title: string; notification: string; isClosed: boolean }
  const initialNotification: TNotification = {isFlag: false, title: '', notification: '', isClosed: false}
  const [notification, setNotification] = useState<TNotification>(initialNotification);

  const [isOpen, setIsOpen] = useState(false);
  const { source, isLoading, hasError, hasMessage, errorMsg, successMsg }: any = useSelector<any>(state => state.api);

  let loadingMsg: string;

  source === '' ? loadingMsg = '' : loadingMsg = loadingMessages.filter(item => item.source === source)[0].loadingMsg;

  const notifications: Array<{ isFlag: boolean; title: string; notification: string; isClosed: boolean }> = [
    { isFlag: isLoading, title: 'Ожидайте', notification: `${loadingMsg}`, isClosed: false },
    { isFlag: hasError, title: 'Что-то пошло не так...', notification: `${errorMsg}`, isClosed: true },
    { isFlag: hasMessage, title: 'Ответ сервера:', notification: `${successMsg}`, isClosed: true }
  ]

  useEffect(() => {
    setIsOpen(isLoading || hasError);
    setNotification(notifications.find((item) => { return item.isFlag }) || initialNotification);
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
        document.getElementById('notifier') as Element
      )}
    </>
  )
}

export default Notifier
