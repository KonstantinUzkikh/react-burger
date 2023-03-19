import { FC, ReactElement } from "react";

import ImgWithRest from "../img-with-rest/img-with-rest";
import { TIngredient } from "../../utils";
import orderInLineLayout from './order-in-line.module.css'

const OrderInLine: FC<{ arrIngredients: TIngredient[] }> = ({ arrIngredients }) => {

  // Максимальное число иконок, отрисовываемых в строке
  const limitCountImages = 6;

  const countImages = Math.min(limitCountImages, arrIngredients.length);

  let rest: string | null;
  let arrImages: ReactElement[] = [];

  let step = countImages - 1;
  while (step >= 0) {

    arrIngredients.length > countImages && step === countImages - 1
      ? rest = '+' + String(arrIngredients.length - countImages)
      : rest = null;

    arrImages[countImages - 1 - step] =
      (<div className={orderInLineLayout.image} style={{ left: `${step * 48}px` }} key={step} >
        <ImgWithRest src={arrIngredients[step].image_mobile} name={arrIngredients[step].name} count={rest} />
      </div>)

    step--;
  }

  return (
    <>
      <div className={orderInLineLayout.boxMain}>
        {arrImages}
      </div>
    </>
  )
}

export default OrderInLine
