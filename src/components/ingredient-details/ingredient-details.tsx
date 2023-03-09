import { FC } from 'react';

import { useSelector } from '../../store/hooks';
import { h3_type, letters_grey, digits_grey } from '../../utils/types';
import type { TIngredient } from '../../utils/types-data';
import ingredientLayout from './ingredient-details.module.css';

const Value: FC<{ name: string; value: number }> = ({ name, value }) => {
  return (
    <div className={ingredientLayout.boxValue}>
      <p className={letters_grey}>{name}</p>
      <p className={digits_grey}>{value}</p>
    </div>
  )
}

const IngredientDetails: FC<{ ingredient?: TIngredient }> = ({ ingredient }) => {

  let { currentIngredient } = useSelector(state => state.ingredientDetails);

  if (ingredient !== undefined) { currentIngredient = ingredient }

  return (
    <div className={ingredientLayout.boxMain}>
      <img src={currentIngredient.image_large} alt={currentIngredient.name} className={ingredientLayout.image} />
      <h3 className={`${h3_type} ${ingredientLayout.name} mb-8 mt-4`} >{currentIngredient.name}</h3>
      <div className={ingredientLayout.boxValues}>
        <Value name='Калории,ккал' value={currentIngredient.calories} />
        <Value name='Белки, г' value={currentIngredient.proteins} />
        <Value name='Жиры, г' value={currentIngredient.fat} />
        <Value name='Углеводы, г' value={currentIngredient.carbohydrates} />
      </div>
    </div>
  )
}

export default IngredientDetails
