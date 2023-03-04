import { useEffect, useRef, FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import IngredientDetails from '../components/ingredient-details/ingredient-details';
import type { TIngredient } from '../utils/types';
import ingredientLayout from './ingredient.module.css'

const IngredientPage: FC = () => {

  const navigate = useNavigate();
  const id = useParams().id;

  const { isLoadIngredients, ingredients }: any = useSelector<any>(state => state.ingredients);
  const ingredientRef = useRef();

  useEffect(() => {
    if (isLoadIngredients) {
      ingredientRef.current = ingredients.filter((item: TIngredient) => item._id === id)[0];
      if (ingredientRef.current === undefined) navigate('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadIngredients]);

  return (
    <>
      {isLoadIngredients &&
        <div className={ingredientLayout.boxPage}>
          <IngredientDetails ingredient={ingredientRef.current} />
        </div>
      }
    </>
  )
}

export default IngredientPage
