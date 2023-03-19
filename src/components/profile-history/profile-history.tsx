import { FC, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "../../store/hooks-store";
import { wsAuthConnectionStart, wsAuthConnectionStop } from "../../store/actions";
import profileHistoryLayout from './profile-history.module.css'
import OrderInfo from "../order-info/order-info";

const ProfileHistory: FC = () => {

  const location = useLocation();
  const dispatch = useDispatch();

  const { orders } = useSelector(state => state.wsAuth);

  useEffect(() => {
    dispatch(wsAuthConnectionStart());
    return () => {
      dispatch(wsAuthConnectionStop());
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {orders.length !== 0 &&
        <div className={profileHistoryLayout.boxOrders}>
          {
            orders.sort((a, b) => {
              if (a.createdAt > b.createdAt) return -1;
              if (a.createdAt < b.createdAt) return 1;
              return 0;
            }).map(order =>
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
