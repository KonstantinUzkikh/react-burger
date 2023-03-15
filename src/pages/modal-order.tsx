import { FC, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from '../store/hooks';
import Modal from '../components/modal/modal';
import OrderInfo from '../components/order-info/order-info';
import { wsConnectionStop, wsConnectionStart, wsAuthConnectionStop, wsAuthConnectionStart } from '../store/actions';
import { TOrder } from '../services/types-responses';
import { IWSAuthConnectionStart, IWSAuthConnectionStop, IWSConnectionStart, IWSConnectionStop } from '../store/action-types';

const ModalOrderPage: FC = () => {

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const id = useParams().id;
  const { pathname } = useLocation();

  let source: 'feed' | 'profile' = 'feed';
  if (pathname.includes('profile')) source = 'profile';

  const [isFiltered, setIsFiltered] = useState(false);

  const orderRef = useRef<TOrder>();

  const { orders: ordersAll } = useSelector(state => state.ws);
  const { orders: ordersAuth } = useSelector(state => state.wsAuth);

  let orders: TOrder[];
  let wsStart: (() => IWSConnectionStart) | (() => IWSAuthConnectionStart);
  let wsStop: (() => IWSConnectionStop) | (() => IWSAuthConnectionStop);

  if (source ===  'feed') {
    orders = ordersAll;
    wsStart = wsConnectionStart;
    wsStop = wsConnectionStop;
  } else {
    orders = ordersAuth;
    wsStart = wsAuthConnectionStart;
    wsStop = wsAuthConnectionStop;
  };

  useEffect(() => {
    dispatch(wsStart());
    return () => {
      //dispatch(wsResetOrders());
      dispatch(wsStop());
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isFiltered && orders.length !== 0) {
      orderRef.current = orders.filter(it => String(it.number) === id)[0];
      setIsFiltered(true);
      if (orderRef.current === undefined) navigate('/order-not-found')
    }
    isFiltered && dispatch(wsConnectionStop());
  }, [orders, isFiltered]); // eslint-disable-line react-hooks/exhaustive-deps

  const closeCallback = () => navigate(-1);

  return (
    <>
      {isFiltered && (orderRef.current !== undefined) &&
        <Modal title={`#${orderRef.current.number}`} closeCallback={closeCallback} >
          <OrderInfo order={orderRef.current} source={source} direction={'column'} />
        </Modal>
      }
    </>
  );
}

export default ModalOrderPage
