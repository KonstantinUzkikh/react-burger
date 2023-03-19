import { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useSelector } from '../store/hooks-store';
import Modal from '../components/modal/modal';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import type { TIngredient } from '../utils';

const IngredientModalPage: FC = () => {

  let navigate = useNavigate();
  const id = useParams().id;

  const { ingredients } = useSelector(state => state.ingredients);
  const ingredient: TIngredient = ingredients.filter((item: TIngredient) => item._id === id)[0];

  const closeCallback = () => navigate(-1);

  return (
    <>
      <Modal title='Детали ингредиента' closeCallback={closeCallback} >
        <IngredientDetails ingredient={ingredient} />
      </Modal>
    </>
  );
}

export default IngredientModalPage
