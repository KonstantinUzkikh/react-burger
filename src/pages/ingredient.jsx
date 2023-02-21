import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { request } from '../components/api/api';
import IngredientDetails from '../components/ingredient-details/ingredient-details';

import ingredientLayout from './ingredient.module.css'

function IngredientPage() {

  const navigate = useNavigate();
  const id = useParams().id;

  const [isLoad, setIsLoad] = useState(false);
  const [ingredient, setIngredient] = useState(null);

  const loadIngredient = useCallback(() => {
    let ingredient;
    request('/ingredients')
      .then(res => res.data)
      .then(arr => {
        ingredient = arr.find(item => item._id === id);
        if (ingredient === undefined) { navigate('/') }
        setIngredient(ingredient);
        setIsLoad(true);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    loadIngredient();
  }, [id, loadIngredient]
  );

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
