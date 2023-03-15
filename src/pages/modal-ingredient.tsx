import { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from '../store/hooks';
import { resetBurger } from '../store/actions/burger-constructor';
import Modal from '../components/modal/modal';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import type { TIngredient } from '../utils/types-data';

const ModalIngredientPage: FC = () => {

  let navigate = useNavigate();
  const id = useParams().id;

  //const dispatch = useDispatch();
  //dispatch(resetBurger());

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

export default ModalIngredientPage
