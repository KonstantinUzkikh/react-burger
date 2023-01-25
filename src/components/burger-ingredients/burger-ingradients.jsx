import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import { Counter, CurrencyIcon, Tab, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ingredientType } from '../../utils/types.js';
import ingradientsLayout from './burger-ingradients.module.css';

const Ingredient = ({data, onOpen, setComponent}) => {

  const {image, name, price, count } = data;
  const isCount = (typeof(count) === 'number');

  const onClickComponent = () => {
    setComponent(data);
    onOpen();
  }

  return (
    <div href='#' type="button"  className={ingradientsLayout.buttonIngradient} onClick={onClickComponent} >
      <div className={ingradientsLayout.image}>
        <img src={image} alt={name}/>
      </div>
      <div className={ingradientsLayout.price}>
        <span className="text text_type_digits-default">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <div className={ingradientsLayout.name}>
        <p className="text text_type_main-default">{name}</p>
      </div>
      <div className={ingradientsLayout.counter}>
        {isCount && (<Counter count={count} size="default" />)}
      </div>
    </div>
  );
};

Ingredient.propTypes = {
  data: ingredientType,
  onOpen: PropTypes.func.isRequired,
  setComponent: PropTypes.func.isRequired
};

const TypeIngredients = ({type, arr, onOpen, setComponent}) => {

  let name;
  switch (type) {
    case 'bun':
      name = 'Булки';
      break;
    case 'sauce':
      name = 'Соусы';
      break;
    case 'main':
      name = 'Начинки';
      break;
    default:
      name = '';
    break;
  };

  return (
    <div className={ingradientsLayout.boxTypeIngredients}>
      <h3 className="text text_type_main-medium mb-6 mt-10">{name}</h3>
      <div className={ingradientsLayout.ingradients}>
        {arr.map((item) => {
          if (item.type === type) {
            return (
              <Ingredient data={item} key={item._id} onOpen={onOpen} setComponent={setComponent} />
            )
          }
        })}
      </div>
  </div>
  );
};

TypeIngredients.propTypes = {
  type: PropTypes.string,
  arr: PropTypes.arrayOf(ingredientType).isRequired,
  onOpen: PropTypes.func.isRequired,
  setComponent: PropTypes.func.isRequired
};

function BurgerIngredients({data}) {

  const [current, setCurrent] = React.useState('one');
  const [component, setComponent] = React.useState({});

  const [isModal, setIsModal] = React.useState(false);
  const onCloseModal = () => { setIsModal(false) }
  const onOpenModal = () => { setIsModal(true) }

  return (
    <div>
      <h1 className="text text_type_main-large mb-5 mt-9">Соберите бургер</h1>
      <div className={ingradientsLayout.boxTab}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent} >Булки</Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent} >Соусы</Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent} >Начинки</Tab>
      </div>
      <div className={ingradientsLayout.boxListIngredients}>
        <TypeIngredients type="bun" arr={data} onOpen={onOpenModal} setComponent={setComponent} />
        <TypeIngredients type="main" arr={data} onOpen={onOpenModal} setComponent={setComponent} />
        <TypeIngredients type="sauce" arr={data} onOpen={onOpenModal} setComponent={setComponent} />
      </div>
      {isModal && (
        <Modal title="Детали ингредиента" onClose={onCloseModal} >
          <IngredientDetails component={component} />
        </Modal>
      )}
    </div>
  )
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
};

export default BurgerIngredients;
