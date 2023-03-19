import { FC } from 'react';

import { TIngredient, h3_type, letters_grey, digits_grey } from '../../utils';
import ingredientLayout from './ingredient-details.module.css';

const Value: FC<{ name: string; value: number }> = ({ name, value }) => {
  return (
    <div className={ingredientLayout.boxValue}>
      <p className={letters_grey}>{name}</p>
      <p className={digits_grey}>{value}</p>
    </div>
  )
}

const IngredientDetails: FC<{ ingredient: TIngredient }> = ({ ingredient }) => {

  return (
    <div className={ingredientLayout.boxMain}>
      <img src={ingredient.image_large} alt={ingredient.name} className={ingredientLayout.image} />
      <h3 className={`${h3_type} ${ingredientLayout.name} mb-8 mt-4`} >{ingredient.name}</h3>
      <div className={ingredientLayout.boxValues}>
        <Value name='Калории,ккал' value={ingredient.calories} />
        <Value name='Белки, г' value={ingredient.proteins} />
        <Value name='Жиры, г' value={ingredient.fat} />
        <Value name='Углеводы, г' value={ingredient.carbohydrates} />
      </div>
    </div>
  )
}

export default IngredientDetails
