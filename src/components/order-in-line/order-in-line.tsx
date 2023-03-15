import { FC } from "react";
import { TIngredient } from "../../utils/types-data";

import ImageIngredient from '../image-ingredient/image-ingredient';
import TooMuch from '../too-much/too-much';

import orderInLineLayout from './order-in-line.module.css'

const OrderInLine: FC<{ arrIngredients: TIngredient[] }> = ({ arrIngredients: burger }) => {

  const LimitCountImages = 6;

  const countImages = Math.min(LimitCountImages, burger.length);

  let rest;
  burger.length > countImages ? rest = '+' + String(burger.length - countImages) : rest = null;

  return (
    <>
      <div className={orderInLineLayout.boxMain}>
        {rest &&
          <div className={orderInLineLayout.count}>
            <TooMuch count={rest} />
          </div>
        }
        {countImages > 5 &&
          <div className={orderInLineLayout.image6}>
            <ImageIngredient src={burger[5].image_mobile} name={burger[5].name} />
          </div>
        }
        {countImages > 4 &&
          <div className={orderInLineLayout.image5}>
            <ImageIngredient src={burger[4].image_mobile} name={burger[4].name} />
          </div>
        }
        {countImages > 3 &&
          <div className={orderInLineLayout.image4}>
            <ImageIngredient src={burger[3].image_mobile} name={burger[3].name} />
          </div>
        }
        {countImages > 2 &&
          <div className={orderInLineLayout.image3}>
            <ImageIngredient src={burger[2].image_mobile} name={burger[2].name} />
          </div>
        }
        {countImages > 1 &&
          <div className={orderInLineLayout.image2}>
            <ImageIngredient src={burger[1].image_mobile} name={burger[1].name} />
          </div>
        }
        {countImages > 0 &&
          <div className={orderInLineLayout.image1}>
            <ImageIngredient src={burger[0].image_mobile} name={burger[0].name} />
          </div>
        }
      </div>
    </>
  )
}

export default OrderInLine
