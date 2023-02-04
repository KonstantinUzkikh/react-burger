import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// eslint-disable-next-line no-unused-vars
import { Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

//import { ingredientType } from '../../utils/types.js';
import ingredientLayout from './ingredient-details.module.css';

const Value = ({name, value}) => {
  return (
    <div className={ingredientLayout.boxValue}>
      <p className="text text_type_main-default text_color_inactive">{name}</p>
      <p className="text text_type_digits-default text_color_inactive">{value}</p>
    </div>
  )
}

Value.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number
};

function IngredientDetails() {

  const { currentIngredient } = useSelector(state => state.ingredientDetails);

  return (
    <div className={ingredientLayout.boxMain}>
      <img src={currentIngredient.image_large} alt={currentIngredient.name} className={ingredientLayout.image} />
      <p className={`${ingredientLayout.name} text text_type_main-medium mb-8 mt-4`} >{currentIngredient.name}</p>
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
