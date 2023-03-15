import { useMemo, FC } from 'react';

import { useSelector } from '../../store/hooks';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { h3_type } from '../../utils/types';


const ModalLoader: FC = () => {

  const { isModalOpen, title, modalContent } = useSelector(state => state.modal);

  const valueModalContent = useMemo(
    () => {
      switch (modalContent) {
        case 'ingredient': {
          return <IngredientDetails />
        }
        case 'orderID': {
          return <OrderDetails />
        }
        case 'error404': {
          return (<>
            <h3 className={h3_type}>Ошибка 404</h3>
            <h3 className={h3_type}>Cтраница не существует</h3>
          </>)
        }
        default: {
          return <></>
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isModalOpen]
  );

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
