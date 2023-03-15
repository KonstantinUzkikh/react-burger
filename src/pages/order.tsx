import { FC, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from "../store/hooks";
import OrderInfo from '../components/order-info/order-info';
import { wsAuthConnectionStart, wsAuthConnectionStop, wsConnectionStart, wsConnectionStop } from "../store/actions";
import { IWSAuthConnectionStart, IWSAuthConnectionStop, IWSConnectionStart, IWSConnectionStop } from "../store/action-types";
import { TOrder } from "../services/types-responses";
import { digits } from '../utils/types';
import orderLayout from './order.module.css'

const OrderPage: FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  return (
    <>
      {isFiltered && (orderRef.current !== undefined) &&
        <div className={orderLayout.boxPage}>
          <span className={`${digits} ${orderLayout.orderId}`}>#{orderRef.current.number}</span>
          <OrderInfo order={orderRef.current} source={source} direction={'column'} />
        </div>
      }
    </>
  )
}

export default OrderPage
