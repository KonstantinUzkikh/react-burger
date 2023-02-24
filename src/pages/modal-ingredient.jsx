import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Modal from '../components/modal/modal';
import IngredientDetails from '../components/ingredient-details/ingredient-details';

function ModalIngredientPage() {

  let navigate = useNavigate();
  const id = useParams().id;

  const { ingredients } = useSelector(state => state.ingredients);
  const ingredient = ingredients.filter((item) => item._id === id)[0];

  const closeCallback = () => navigate(-1);

  return (
    <>
      <Modal title='Детали ингредиента' closeCallback={closeCallback} >
        <IngredientDetails ingredient={ingredient} />
      </Modal>
    </>
  );
}

export default ModalIngredientPage
