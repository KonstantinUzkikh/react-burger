import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";

// eslint-disable-next-line no-unused-vars
import { ConstructorElement, Button, DragIcon, CurrencyIcon, Typography, Box }
  from '@ya.praktikum/react-developer-burger-ui-components';

import { getConfirmOrder } from '../../services/get-data';
import { ingredientType } from '../../utils/types.js';
import currency from '../../images/currency-icon.svg';
import componentsLayout from './burger-constructor.module.css';

import { MODAL_OPEN } from '../../services/actions/modal';

import { CANCEL_ORDER_DETAILS } from '../../services/actions/order-details';

import {
  ADD_BURGER_INGREDIENT,
  DELETE_BURGER_INGREDIENT,
  UPDATE_BURGER_BUN
} from '../../services/actions/burger-constructor';

import {
  INCREASE_COUNT_BURGER_INGREDIENT,
  DECREASE_COUNT_BURGER_INGREDIENT,
  CANCEL_COUNT_BURGER_BUN,
  SET_DOUBLE_COUNT_BURGER_BUN
} from '../../services/actions/burger-ingradients';

const BurgerComponent = ({type, component }) => {

  const dispatch = useDispatch();

  const { key, _id } = component;

  const onDelete = () => {
    dispatch({
      type: DELETE_BURGER_INGREDIENT,
      key: key
    });
    dispatch({
      type: DECREASE_COUNT_BURGER_INGREDIENT,
      _id: component._id
    });
  }

  const [{isDrag}, dragBurgerIngredientRef] = useDrag({
    type: 'burger ingredient',
    item: { key, _id },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  let text  = '';
  let extraClass = '';

  if (component.type === 'bun') {
    if (type === 'top') {
      text = '(верх)';
      extraClass = 'mb-4';
    } else {
      text = '(низ)';
      extraClass = 'mt-4 mb-9';
    }
  }

  return (
    !isDrag &&
    <div className={componentsLayout.component} ref={dragBurgerIngredientRef}>
        <ConstructorElement
          type={type}
          isLocked={component.type === 'bun' ? true : false}
          text={`${component.name} ${text}`}
          price={component.price}
          thumbnail={component.image}
          extraClass={extraClass}
          handleClose={onDelete}
        />
      {component.type !== 'bun' ? <DragIcon type="secondary" /> : null}
    </div>
  );
}

BurgerComponent.propTypes = {
  type: PropTypes.oneOf(["top", "bottom"]),
  component: ingredientType
};

function BurgerConstructor() {

  const dispatch = useDispatch();
  const { burger } = useSelector(state => state.constructorContent);
  const { ingredients } = useSelector(state => state.ingredients);

  const total = useSelector(state => {
    const { constructorContent: { burger } } = state;
    if (burger.length > 0) {
      return burger.reduce((previousValue, item) => previousValue + item.price * item.count, 0)
    } else {
      return 0;
    };
  });

  const makeOrder = () => {
    function setCancelOrderDetails() {
      return function(dispatch) {
        dispatch({
          type: CANCEL_ORDER_DETAILS
        })
      }
    }
    if (isBunContent && isIngredientContent) {
      dispatch(getConfirmOrder(burger));
      dispatch({
        type: MODAL_OPEN,
        modalContent: 'order',
        setCancelContent: setCancelOrderDetails
      });
    }
  }

  const [{isHoverIngredient}, dropIngredientTarget] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHoverIngredient: monitor.isOver()
    }),
    drop(item) {moveIngredientToBurger(item)}
  });

  const moveIngredientToBurger = ({_id}) => {
    dispatch({
      type: ADD_BURGER_INGREDIENT,
      ingredient: {...ingredients.filter((item) => item._id === _id)[0], count: 1, key: Date.now()}
    });
    dispatch({
      type: INCREASE_COUNT_BURGER_INGREDIENT,
      _id: _id
    });
  }

  const [{isHoverBunTop}, dropBunTopTarget] = useDrop({
    accept: 'bun',
    collect: monitor => ({
      isHoverBunTop: monitor.isOver()
    }),
    drop(item) {moveBunToBurger(item)}
  });

  const [{isHoverBunBottom}, dropBunBottomTarget] = useDrop({
    accept: 'bun',
    collect: monitor => ({
      isHoverBunBottom: monitor.isOver()
    }),
    drop(item) {moveBunToBurger(item)}
  });

  const moveBunToBurger = ({_id}) => {
    burger[0].type === 'bun' && dispatch({
      type: CANCEL_COUNT_BURGER_BUN,
      _id: burger[0]._id
    });
    dispatch({
      type: UPDATE_BURGER_BUN,
      ingredient: {...ingredients.filter((item) => item._id === _id)[0], count: 2, key: Date.now()}
    });
    dispatch({
      type: SET_DOUBLE_COUNT_BURGER_BUN,
      _id: ingredients.filter((item) => item._id === _id)[0]._id
    });
  }

  const [{isHoverBurgerIngredient}, dropBurgerIngredientTarget] = useDrop({
    accept: 'burger ingredient',
    collect: monitor => ({
      isHoverBurgerIngredient: monitor.isOver()
    }),
    drop(item) {moveBurgerIngredientInBurger(item)}
  });

  const moveBurgerIngredientInBurger = ({key, _id}) => {
    dispatch({
      type: DELETE_BURGER_INGREDIENT,
      key: key
    });
    dispatch({
      type: ADD_BURGER_INGREDIENT,
      ingredient: {...ingredients.filter((item) => item._id === _id)[0], count: 1, key: Date.now()}
    });
  }

  const isBunContent = burger[0].type === 'bun';
  const isIngredientContent = burger.length > 1;
  const typeButton = isBunContent && isIngredientContent ? "primary" : "secondary";

  const classNameBunStart = `${componentsLayout.start} ${isHoverBunTop || isHoverBunBottom ? componentsLayout.onHover : ''}`;
  const classNameBunPlus = `${isHoverBunTop || isHoverBunBottom ? componentsLayout.plus : ''}`;
  const classNameTopBun = `${classNameBunStart} text text_type_main-medium pb-4 pt-4 mb-4 ml-9 mr-1`;
  const classNameBottomBun = `${classNameBunStart} text text_type_main-medium pb-4 pt-4 mt-4 mb-4 ml-9 mr-1`;
  const classNameIngredients =
    `${componentsLayout.start} ${isHoverIngredient || isHoverBurgerIngredient ? componentsLayout.onHover : ''}`;
  const classNameIngredientsFull = `${classNameIngredients} text text_type_main-medium pb-4 pt-4 ml-9 mr-1`;
  const classNameIngredientsPlus =
    `${componentsLayout.components} ${isIngredientContent && (isHoverIngredient || isHoverBurgerIngredient) ? componentsLayout.plus : ''}`;

  return (
    <section className={componentsLayout.boxMain}>
      <div ref={dropBunTopTarget} >
        {isBunContent
          ? <div className={classNameBunPlus}><BurgerComponent component={burger[0]} type = "top" /></div>
          : (<h3 className={classNameTopBun}>Выберите булку</h3>)
        }
      </div>

      <div ref={dropBurgerIngredientTarget}>
        <div className={classNameIngredientsPlus} ref={dropIngredientTarget} >
          {isIngredientContent
            ? burger.map((item) =>
              item.type !== 'bun' && item.type !== 'blank' && <BurgerComponent component={item} key={item.key}/>)
            : (<h3 className={classNameIngredientsFull}>Вложите ингредиенты</h3>)
          }
        </div>
      </div>

      <div ref={dropBunBottomTarget} >
        {isBunContent
          ? <div className={classNameBunPlus}><BurgerComponent component={burger[0]} type = "bottom" /></div>
          : (<h3 className={classNameBottomBun}>Выберите булку</h3>)
        }
      </div>

      <div className={componentsLayout.total} >
        <Button htmlType="button" type={typeButton} size="large" extraClass="ml-10" onClick={makeOrder} >
          Оформить заказ
        </Button>
        <img src={currency} alt="алмазик" className={componentsLayout.icon} />
        <span className="text text_type_digits-medium">{total}</span>
      </div>
    </section>
  )
}

export default BurgerConstructor;
