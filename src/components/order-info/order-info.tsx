import { FC, useRef, useEffect, useState } from "react";

import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderInLine from '../order-in-line/order-in-line';
import OrderToColumn from '../order-to-column/order-to-column';
import { useSelector } from '../../store/hooks-store';
import { TIngredient, TOrder, h3_type, letters, letters_grey, digits } from '../../utils';
import orderInfoLayout from './order-info.module.css';

const OrderInfo: FC<{ order: TOrder, source: 'feed' | 'profile', direction: 'row' | 'column' }> = ({ order, source, direction }) => {

  const { number, name, status, createdAt, ingredients: arrID } = order;

  let info;
  let style = '';
  switch (status) {
    case 'created': info = 'Создан'; break;
    case 'pending': info = 'Готовится'; break;
    case 'done': info = 'Выполнен'; style = orderInfoLayout.done; break;
    default: info = 'Cоздан';
  }

  const { isLoadIngredients, ingredients } = useSelector(state => state.ingredients);
  const burgerRef = useRef<any>();
  const [isSecondRender, setIsSecondRender] = useState(false);

  useEffect(() => {
    if (isLoadIngredients) {
      burgerRef.current = arrID.map((item) => ingredients.find((it) => it._id === item));
      //burgerRef.current = arrID.map((item) => ingredients.reduce(
      //  (prev, it) => it._id === item ? it : prev), {});
      setIsSecondRender(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadIngredients]);

  let arrIngredients: TIngredient[] = [];
  let total: number = 0;

  if (isLoadIngredients && isSecondRender) {
    arrIngredients = [...burgerRef.current];
    total = arrIngredients.reduce((previousValue, item) => {
      if (item !== undefined) {
        if (item.type === 'bun') return previousValue + 2 * item.price;
        else return previousValue + item.price;
      }
      else return previousValue;
    }, total);
  }

  return (
    <>
      {isLoadIngredients && isSecondRender && direction === 'row' &&
        <div className={orderInfoLayout.boxLine} >
          <div className={orderInfoLayout.boxContent} >
            <span className={digits}>#{number}</span>
            <div className={letters_grey}><FormattedDate date={new Date(createdAt)} /></div>
          </div>
          <div>
            <h3 className={h3_type} >{name}</h3>
            {source === 'profile' &&
              <p className={`${letters} ${style} mt-2`} >{info}</p>
            }
          </div>
          <div className={orderInfoLayout.boxContent} >
            <OrderInLine arrIngredients={arrIngredients} />
            <div className={orderInfoLayout.total}>
              <CurrencyIcon type="primary" />
              <span className={digits}>{total}</span>
            </div>
          </div>
        </div>
      }
      {isLoadIngredients && isSecondRender && direction === 'column' &&
        <div className={orderInfoLayout.boxColumn} >
          <h3 className={`${h3_type} mt-5 mb-3`} >{name}</h3>
          <p className={`${letters} ${style}`} >{info}</p>
          <h3 className={`${h3_type} mt-15 mb-6`} >Состав:</h3>
          <div className={orderInfoLayout.ingredients} ><OrderToColumn arrIngredients={arrIngredients} /></div>
          <div className={`${orderInfoLayout.boxContent} mt-10`} >
            <div className={letters_grey}><FormattedDate date={new Date(createdAt)} /></div>
            <div className={orderInfoLayout.total}>
              <CurrencyIcon type="primary" />
              <span className={digits}>{total}</span>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default OrderInfo;
