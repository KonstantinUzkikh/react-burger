import { FC } from "react";
import { TIngredient } from "../../utils/types-data";

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ImgWithRest from "../img-with-rest/img-with-rest";
import { letters, digits } from '../../utils';
import orderToColumnLayout from './order-to-column.module.css'

const OrderToColumn: FC<{ arrIngredients: TIngredient[] }> = ({ arrIngredients }) => {

  const shortArr: TIngredient[] =
    JSON.parse(JSON.stringify(arrIngredients.filter((it, ind, arr) => arr.indexOf(it) === ind)));

  shortArr.forEach(item =>
    item.count = arrIngredients.reduce((prev, it) =>
      it._id === item._id
        ? it.type === 'bun'
          ? prev + 2
          : ++prev
        : prev, 0
    ))

  return (
    <>
      <div className={orderToColumnLayout.boxMain}>
        {
          shortArr.map((item: TIngredient) => {
            return (
              <div className={orderToColumnLayout.boxIngredient} key={item._id} >
                <div className={orderToColumnLayout.boxName}>
                  <ImgWithRest src={item.image_mobile} name={item.name} />
                  <span className={`${letters} ${orderToColumnLayout.name}`}>{item.name}</span>
                </div>
                <div className={orderToColumnLayout.total}>
                  <div>
                    <span className={digits}>{`${item.count}x`}</span>
                    <span className={digits}>{item.price}</span>
                  </div>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default OrderToColumn
