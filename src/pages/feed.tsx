import { FC, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from "../store/hooks";
import { wsConnectionStart, wsConnectionStop, wsResetOrders } from "../store/actions";
import { TOrder } from "../services/types-responses";
import { h1_type, h3_type, digits } from '../utils/types';
import feedLayout from './feed.module.css'
import OrderInfo from "../components/order-info/order-info";

const FeedPage: FC = () => {

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStart());
    return () => {
      //dispatch(wsResetOrders());
      dispatch(wsConnectionStop());
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { orders, total, totalToday } = useSelector(state => state.ws);

  return (
    <>
      {orders.length !== 0 &&
        <div>
          <div className={feedLayout.boxPage}>
            <h1 className={`${h1_type} mb-5`} >Лента заказов</h1>
          </div>
          <div className={feedLayout.boxContent}>
            <div className={feedLayout.boxOrders}>
              {
                orders.map((order: TOrder) => {
                  return (
                    <Link
                      key={order.number}
                      to={`/feed/${order.number}`}
                      style={{ color: 'white', textDecoration: 'none' }}
                      state={{ backgroundLocation: location }}
                      >
                      <OrderInfo order={order} source={'feed'} direction={'row'} key={order._id} />
                    </Link>
                  )
                })
              }
            </div>
            <div className={feedLayout.boxStat}>
              <div className={feedLayout.boxStatCurrent}>
                <div className={`${feedLayout.column} ${feedLayout.done}`}>
                  <h3 className={`${h3_type} mb-6`} >Готовы:</h3>
                  <div className={feedLayout.orders}>
                    {
                      orders.filter(it => it.status === 'done')
                        .map(item => item.number)
                        .map((number, index) => <p className={`${digits} mr-2`} key={index} >{number}</p>)
                    }
                  </div>
                </div>
                <div className={feedLayout.column}>
                  <h3 className={`${h3_type} mb-6`} >В работе:</h3>
                  <div className={feedLayout.orders}>
                    {
                      orders.filter(it => it.status === 'pending')
                        .map(item => item.number)
                        .map((number, index) => <p className={`${digits} mr-2`} key={index} >{number}</p>)
                    }
                  </div>
                </div>
              </div>
              <div className={feedLayout.boxStatTotal}>
                <h3 className={h3_type} >Выполнено за все время:</h3>
                <p className='text text_type_digits-large' >{total}</p>
              </div>
              <div className={feedLayout.boxStatTotal}>
                <h3 className={h3_type} >Выполнено за сегодня:</h3>
                <p className='text text_type_digits-large' >{totalToday}</p>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default FeedPage
