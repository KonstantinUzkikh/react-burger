import { FC } from "react";
import { TIngredient } from "../../utils/types-data";

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ImageIngredient from '../image-ingredient/image-ingredient';
import { letters, digits } from '../../utils/types';
import orderToColumnLayout from './order-to-column.module.css'

const OrderToColumn: FC<{ arrIngredients: TIngredient[] }> = ({arrIngredients}) => {

  return (
    <>
      <div className={orderToColumnLayout.boxMain}>
        {
          arrIngredients.map((item: TIngredient, index) => {
            return (
              <div className={orderToColumnLayout.boxIngredient} key={index} >
                <div  className={orderToColumnLayout.boxName}>
                  <ImageIngredient src={item.image_mobile} name={item.name} />
                  <span className={`${letters} ${orderToColumnLayout.name}`}>{item.name}</span>
                </div>
                <div className={orderToColumnLayout.total}>
                  <div>
                    {item.type === 'bun' ? <span className={digits}>2 x </span> : <span className={digits}>1 x </span>}
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
