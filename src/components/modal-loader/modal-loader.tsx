import { useMemo, FC } from 'react';

import { useSelector } from '../../store/hooks-store';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

const ModalLoader: FC = () => {

  const { isModalOpen, title, modalContent } = useSelector(state => state.modal);

  const valueModalContent = useMemo(() => {
    switch (modalContent) {
      case 'orderID': { return <OrderDetails /> }
      default: { return <></> }
    }
  }, [isModalOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {isModalOpen && (
        <Modal title={title} >
          {valueModalContent}
        </Modal>
      )}
    </>
  );
}

export default ModalLoader;
