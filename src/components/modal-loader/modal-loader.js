import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';


function ModalLoader() {

  const  { isModalOpen, title, modalContent } = useSelector(state => state.modal);

  const valueModalContent = useMemo(
    () => {
      switch (modalContent) {
        case 'ingredient': {
          return <IngredientDetails />
        }
        case 'order': {
          return <OrderDetails />
        }
        default: {
          return null
        }
      }
    },
    [isModalOpen]
  );

  return (
    <div>
      {isModalOpen && (
        <Modal title={title} >
          {valueModalContent}
        </Modal>
      )}
    </div>
  );
}

export default ModalLoader;
