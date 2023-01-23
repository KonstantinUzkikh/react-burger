import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import { Counter, CurrencyIcon, Tab, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ingradientsLayout from './burger-ingradients.module.css';

const Ingredient = ({data, setIsActive, setComponent}) => {

  const {image, name, price, count } = data;
  const isCount = (typeof(count) === 'number');

  const img = (
    <img
      src={image}
      alt={name}
    />
  );

  const onClickComponent = () =>  {
    setComponent(data);
    setIsActive(true);
  }

  return (
    <div href='#' type="button"  className={ingradientsLayout.buttonIngradient} onClick={(() => onClickComponent())} >
      <div className={ingradientsLayout.image}>{img}</div>
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
  data: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  setIsActive: PropTypes.func,
  setComponent: PropTypes.func
};

const TypeIngredients = ({type, arr, setIsActive, setComponent}) => {

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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h3 className="text text_type_main-medium mb-6 mt-10">{name}</h3>
      <div className={ingradientsLayout.ingradients}>
        {arr.map((item, index) => {
          if (item.type === type) {
            return (
              <Ingredient data={item} key={index} setIsActive={setIsActive} setComponent={setComponent} />
            )
          }
        })}
      </div>
  </div>
  );
};

TypeIngredients.propTypes = {
  type: PropTypes.string,
  arr: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  })).isRequired,
  setIsActive: PropTypes.func,
  setComponent: PropTypes.func
};

function BurgerIngredients({data}) {

  const [current, setCurrent] = React.useState('one');
  const [isModal, setIsModal] = React.useState(false);
  const [component, setComponent] = React.useState({});

  return (
    <div>
      <h1 className="text text_type_main-large mb-5 mt-9">Соберите бургер</h1>
      <div style={{ display: 'flex', maxHeight: 56 }}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div style={{ maxHeight: 756, overflow: 'auto' }}>
        <TypeIngredients type="bun" arr={data} setIsActive={setIsModal} setComponent={setComponent} />
        <TypeIngredients type="main" arr={data} setIsActive={setIsModal} setComponent={setComponent} />
        <TypeIngredients type="sauce" arr={data} setIsActive={setIsModal} setComponent={setComponent} />
      </div>
      {isModal && (
        <ModalOverlay isActive={isModal} setIsActive={setIsModal} >
          <Modal title="Детали ингредиента" isActive={isModal} setIsActive={setIsModal} >
            <IngredientDetails component={component} />
          </Modal>
        </ModalOverlay>
      )}
    </div>
  )
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  })).isRequired
};

export default BurgerIngredients;
