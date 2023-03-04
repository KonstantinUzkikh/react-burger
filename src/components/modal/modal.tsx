import { useEffect, useCallback, FC, ReactElement } from 'react';
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from 'react-redux';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { h1_type } from '../../utils/types';
import ModalOverlay from '../modal-overlay/modal-overlay';
import type { TModalState } from '../../services/reducers/modal';
import modalLayout from './modal.module.css';

import { closeModal } from '../../services/actions/modal';

const Modal: FC<{ title?: string, closeCallback?: () => void; children?: ReactElement }> =
  ({ title, closeCallback, children }) => {

    const dispatch = useDispatch();

    const { cancelContentFunc }: any = useSelector<{modal: TModalState}>(state => state.modal);

    const onClose = useCallback(() => {
      cancelContentFunc !== null && dispatch(cancelContentFunc());
      closeCallback !== undefined ? closeCallback() : dispatch(closeModal());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const escCloseModal = (evt: KeyboardEvent) => evt.key === 'Escape' && onClose();
      document.addEventListener('keydown', escCloseModal);
      return () => {
        document.removeEventListener('keydown', escCloseModal)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return ReactDOM.createPortal(
      <ModalOverlay onClose={onClose}>
        <div className={modalLayout.boxMain} onClick={(evt) => evt.stopPropagation()}>
          <div className={modalLayout.boxTitle}>
            <button className={modalLayout.buttonClose} type="button" onClick={onClose}>
              <CloseIcon type="primary" />
            </button>
            <h1 className={h1_type}>{title}</h1>
          </div>
          <div className={modalLayout.children}>
            {children}
          </div>
        </div>
      </ModalOverlay>,
      document.getElementById('modal') as Element
    );
  }

export default Modal
