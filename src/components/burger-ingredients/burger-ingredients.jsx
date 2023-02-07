import React, {useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from "react-dnd";

// eslint-disable-next-line no-unused-vars
import { Counter, CurrencyIcon, Tab, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import { ingredientType } from '../../utils/types.js';
import ingredientsLayout from './burger-ingredients.module.css';

import { openModal } from '../../services/actions/modal';

import { updateCurrentIngredient, cancelCurrentIngredient } from '../../services/actions/ingredient-details';

const Ingredient = ({ data }) => {

  const dispatch = useDispatch();

  const {_id, image, name, price, count } = data;
  const isCount = (count !== 0);
  const isBun = data.type === 'bun';

  const [, dragIngredientRef] = useDrag({
    type: 'ingredient',
    item: {_id}
  });

  const [, dragBunRef] = useDrag({
    type: 'bun',
    item: {_id}
  });

  const onClickComponent = useCallback(() => {
    function setCancelCurrentIngredient() {
      return function(dispatch) {
        dispatch(cancelCurrentIngredient())
      }
    }
    dispatch(updateCurrentIngredient(data))
    dispatch(openModal('Детали ингредиента', 'ingredient', setCancelCurrentIngredient));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      href='#'
      type="button"
      className={ingredientsLayout.buttonIngradient}
      onClick={onClickComponent}
      ref={isBun ? dragBunRef : dragIngredientRef}
    >
      <div className={ingredientsLayout.image}>
        <img src={image} alt={name}/>
      </div>
      <div className={ingredientsLayout.price}>
        <span className="text text_type_digits-default">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <div className={ingredientsLayout.name}>
        <p className="text text_type_main-default">{name}</p>
      </div>
      <div className={ingredientsLayout.counter}>
        {isCount && (<Counter count={count} size="default" />)}
      </div>
    </div>
  );
};

Ingredient.propTypes = {
  data: ingredientType,
};

const TypeIngredients = ({ type }) => {

  const { ingredients } = useSelector(state => state.ingredients);

  let name, id;
  switch (type) {
    case 'bun':
      name = 'Булки';
      id = 'bun';
      break;
    case 'sauce':
      name = 'Соусы';
      id = 'sauce';
      break;
    case 'main':
      name = 'Начинки';
      id = 'main';
      break;
    default:
      name = '';
    break;
  };

  return (
    <div className={ingredientsLayout.boxTypeIngredients}>
      <h3 id={id} className="text text_type_main-medium mb-6 mt-10">{name}</h3>
      <div className={ingredientsLayout.ingradients}>
        {// eslint-disable-next-line
          ingredients.map((item) => {
            if (item.type === type) {
              return (
                <Ingredient data={item} key={item._id} />
              )
            }
          })
        }
      </div>
  </div>
  );
};

TypeIngredients.propTypes = {
  type: PropTypes.string,
};

function BurgerIngredients() {

  const [currentTab, setCurrentTab] = useState('one');

  const refTub = useRef();
  const refBun = useRef();
  const refSauce = useRef();
  const refMain = useRef();

  const setCurrentTabBun = useCallback(() => {
    refBun.current.scrollIntoView({behavior: 'smooth'})
    setCurrentTab('one');
  }, []);
  const setCurrentTabSauce = useCallback(() => {
    refSauce.current.scrollIntoView({behavior: 'smooth'})
    setCurrentTab('two');
  }, []);
  const setCurrentTabMain = useCallback(() => {
    refMain.current.scrollIntoView({behavior: 'smooth'})
    setCurrentTab('three');
  }, []);

  const setActiveTabFromPosition = useCallback(() => {
    const distanceBunToTub = refBun.current.getBoundingClientRect().top - refTub.current.getBoundingClientRect().bottom;
    const distanceSauceToTub = refSauce.current.getBoundingClientRect().top - refTub.current.getBoundingClientRect().bottom;
    const distanceMainToTub = refMain.current.getBoundingClientRect().top - refTub.current.getBoundingClientRect().bottom;
    if (Math.abs(distanceBunToTub) < Math.abs(distanceSauceToTub)
      && Math.abs(distanceBunToTub) < Math.abs(distanceMainToTub))
      { setCurrentTab('one') }
    if (Math.abs(distanceSauceToTub) < Math.abs(distanceBunToTub)
      && Math.abs(distanceSauceToTub) < Math.abs(distanceMainToTub))
      { setCurrentTab('two') }
    if (Math.abs(distanceMainToTub) < Math.abs(distanceBunToTub)
      && Math.abs(distanceMainToTub) < Math.abs(distanceSauceToTub))
      { setCurrentTab('three') }
  }, []);

  return (
    <section>
      <h1 className="text text_type_main-large mb-5 mt-9">Соберите бургер</h1>
      <div className={ingredientsLayout.boxTab} id='tab' ref={refTub} >
        <Tab value="one" active={currentTab === 'one'} onClick={setCurrentTabBun} >Булки</Tab>
        <Tab value="two" active={currentTab === 'two'} onClick={setCurrentTabSauce} >Соусы</Tab>
        <Tab value="three" active={currentTab === 'three'} onClick={setCurrentTabMain} >Начинки</Tab>
      </div>
      <div className={ingredientsLayout.boxListIngredients} onScroll={setActiveTabFromPosition}>
        <div ref={refBun} ><TypeIngredients type="bun" /></div>
        <div ref={refSauce} ><TypeIngredients type="sauce" /></div>
        <div ref={refMain} ><TypeIngredients type="main" /></div>
      </div>
    </section>
  )
};

export default BurgerIngredients;
