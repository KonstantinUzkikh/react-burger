import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// eslint-disable-next-line no-unused-vars
import { Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import { ingredientType, h3_type, letters_grey, digits_grey } from '../../utils/types';
import ingredientLayout from './ingredient-details.module.css';

const Value = ({name, value}) => {
  return (
    <div className={ingredientLayout.boxValue}>
      <p className={letters_grey}>{name}</p>
      <p className={digits_grey}>{value}</p>
    </div>
  )
}

Value.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number
};

function IngredientDetails({ingredient}) {

  let { currentIngredient } = useSelector(state => state.ingredientDetails);

  if (ingredient !== undefined) { currentIngredient = ingredient}

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

IngredientDetails.propTypes = {
  ingredient: ingredientType
};

export default IngredientDetails
