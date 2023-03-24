import { useEffect, useRef, FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useSelector } from '../store/hooks-store';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import type { TIngredient } from '../utils';
import ingredientLayout from './ingredient.module.css'

const IngredientPage: FC = () => {

  const navigate = useNavigate();
  const id = useParams().id;

  const { isLoadIngredients, ingredients } = useSelector(state => state.ingredients);

  const ingredientRef = useRef<TIngredient>();

  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    if (isLoadIngredients) {
      ingredientRef.current = ingredients.filter((item: TIngredient) => item._id === id)[0];
      if (ingredientRef.current === undefined) { navigate('/not-found') } else { setIsFiltered(true) };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadIngredients, isFiltered]);

  return (
    <>
      {isLoadIngredients && ingredientRef.current !== undefined && isFiltered &&
        <div className={ingredientLayout.boxPage}>
          <IngredientDetails ingredient={ingredientRef.current} />
        </div>
      }
    </>
  )
}

export default IngredientPage
