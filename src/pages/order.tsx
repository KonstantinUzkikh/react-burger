import { FC, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { getAccessToken } from "../services/get-data";
import { useDispatch, useSelector } from "../store/hooks-store";
import OrderInfo from '../components/order-info/order-info';
import Modal from "../components/modal/modal";
import { wsAuthConnect, wsAuthDisConnect, wsConnect, wsDisConnect } from "../store/actions";
import { TOrder, digits } from '../utils';
import orderLayout from './order.module.css'

const OrderPage: FC<{ mode: 'modal' | 'page' }> = ({ mode }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams().id;
  const { pathname } = useLocation();

  let source: 'feed' | 'profile' = 'feed';
  if (pathname.includes('profile')) source = 'profile';

  const [isFiltered, setIsFiltered] = useState(false);

  const orderRef = useRef<TOrder>();

  let orders: TOrder[];
  const { orders: ordersAll } = useSelector(state => state.ws);
  const { orders: ordersAuth } = useSelector(state => state.wsAuth);
  source === 'feed' ? orders = ordersAll : orders = ordersAuth;

  useEffect(() => {

    async function openAuthWS() {
      let accessToken = await getAccessToken();
      if (typeof (accessToken) === 'string') accessToken = accessToken.slice('Bearer '.length)
      dispatch(wsAuthConnect(`?token=${accessToken}`));
    }

    source === 'feed' ? dispatch(wsConnect('/all')) : openAuthWS();

    return () => {
      //dispatch(wsResetOrders());
      source === 'feed' ? dispatch(wsDisConnect()) : dispatch(wsAuthDisConnect());
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isFiltered && orders.length !== 0) {
      orderRef.current = orders.filter(it => String(it.number) === id)[0];
      setIsFiltered(true);
      if (orderRef.current === undefined) navigate('/not-found')
    }
    isFiltered && dispatch(wsDisConnect());
  }, [orders, isFiltered]); // eslint-disable-line react-hooks/exhaustive-deps

  const closeCallback = () => navigate(-1);

  return (
    <>
      {mode === 'page' && isFiltered && (orderRef.current !== undefined) &&
        <div className={orderLayout.boxPage}>
          <span className={`${digits} ${orderLayout.orderId}`}>#{orderRef.current.number}</span>
          <OrderInfo order={orderRef.current} source={source} direction={'column'} />
        </div>
      }
      {mode === 'modal' && isFiltered && (orderRef.current !== undefined) &&
        <Modal title={`#${orderRef.current.number}`} closeCallback={closeCallback} >
          <OrderInfo order={orderRef.current} source={source} direction={'column'} />
        </Modal>
      }
    </>
  )
}

export default OrderPage
