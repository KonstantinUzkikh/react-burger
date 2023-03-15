import { FC, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "../../store/hooks";
import { wsAuthConnectionStart, wsAuthResetOrders, wsAuthConnectionStop } from "../../store/actions";
import { TOrder } from "../../services/types-responses";
import profileHistoryLayout from './profile-history.module.css'
import OrderInfo from "../order-info/order-info";

const ProfileHistory: FC = () => {

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsAuthConnectionStart());
    return () => {
      //dispatch(wsAuthResetOrders());
      dispatch(wsAuthConnectionStop());
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { orders } = useSelector(state => state.wsAuth);

  return (
    <>
      {orders.length !== 0 &&
        <div className={profileHistoryLayout.boxOrders}>
          {
            orders.map((order: TOrder) =>
              <Link
                key={order.number}
                to={`/profile/orders/${order.number}`}
                style={{ color: 'white', textDecoration: 'none' }}
                state={{ backgroundLocation: location }}
              >
                <OrderInfo order={order} source={'profile'} direction={'row'} key={order._id} />
              </Link>
            )
          }
        </div>
      }
    </>
  )
}

export default ProfileHistory
