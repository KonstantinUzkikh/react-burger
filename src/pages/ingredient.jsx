import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getIngredient } from '../services/get-data';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import ingredientLayout from './ingredient.module.css'

function IngredientPage() {

  const navigate = useNavigate();
  const id = useParams().id;

  const [isLoad, setIsLoad] = useState(false);
  const [ingredient, setIngredient] = useState(null);

  useEffect(() => {
    async function loadIngredient() {
      const ingredient = await getIngredient(id);
      try {
        if (ingredient === undefined) navigate('/');
        setIngredient(ingredient);
        setIsLoad(true);
      }
      catch (err) { return err }
    }
    loadIngredient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoad &&
        <div className={ingredientLayout.boxPage}>
          <IngredientDetails ingredient={ingredient} />
        </div>
      }
    </>
  )
}

export default IngredientPage
