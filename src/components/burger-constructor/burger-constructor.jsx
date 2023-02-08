import React, {useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";

// eslint-disable-next-line no-unused-vars
import { ConstructorElement, Button, DragIcon, CurrencyIcon, Typography, Box }
  from '@ya.praktikum/react-developer-burger-ui-components';

import { getConfirmOrder } from '../../services/get-data';
import { ingredientType } from '../../utils/types.js';
import componentsLayout from './burger-constructor.module.css';

import { openModal } from '../../services/actions/modal';

import { cancelOrderDetails } from '../../services/actions/order-details';

import { addBurgerIngredient, deleteBurgerIngredient, updateBurgerBun, cancelBurger, moveBurgerIngredient }
  from '../../services/actions/burger-constructor';

import { increaseCountIngredient, decreaseCountIngredient, cancelCountBun, setCountBun, cancelCountAllIngredients }
  from '../../services/actions/burger-ingradients';

const BurgerComponent = ({type, component, index, moveHandler }) => {

  const dispatch = useDispatch();
  const ref = useRef(null);

  const { key, _id } = component;

  const onDelete = useCallback(() => {
    dispatch(deleteBurgerIngredient(key));
    dispatch(decreaseCountIngredient(_id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [{handlerId}, drop] = useDrop({
    accept: 'burger ingredient',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveHandler(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{isDragging}, drag] = useDrag({
    type: 'burger ingredient',
    item: () => {
      return { key, index }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
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

  const opacity = isDragging ? 0.3 : 1;
  drag(drop(ref));

  return (
    <div className={componentsLayout.component} style={{opacity}} ref={ref} data-handler-id={handlerId}>
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
  component: ingredientType,
  index: PropTypes.number,
  moveHandler: PropTypes.func
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

  const moveIngredientToBurger = ({_id}) => {
    dispatch(
      addBurgerIngredient({...ingredients.filter((item) => item._id === _id)[0], count: 1, key: Date.now()})
    );
    dispatch(increaseCountIngredient(_id));
  }

  const moveBunToBurger = ({_id}) => {
    burger[0].type === 'bun' && dispatch(cancelCountBun(burger[0]._id));
    dispatch(updateBurgerBun({...ingredients.filter((item) => item._id === _id)[0], count: 2, key: Date.now()}));
    dispatch(setCountBun(ingredients.filter((item) => item._id === _id)[0]._id));
  }

  const moveHandler = useCallback((dragIndex, hoverIndex) => {
    dispatch(moveBurgerIngredient(dragIndex, hoverIndex));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const makeOrder = useCallback(() => {
    function setCancelOrderDetails() {
      return function(dispatch) {
        dispatch(cancelOrderDetails());
        dispatch(cancelBurger());
        dispatch(cancelCountAllIngredients());
      }
    }
    if (isBunContent && isIngredientContent) {
      dispatch(getConfirmOrder(burger));
      dispatch(openModal('', 'order', setCancelOrderDetails));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [burger]);

  const [{isHoverIngredient}, dropIngredientTarget] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHoverIngredient: monitor.isOver()
    }),
    drop(item) {moveIngredientToBurger(item)}
  });

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

  const isBunContent = burger[0].type === 'bun';
  const isIngredientContent = burger.length > 1;
  const typeButton = isBunContent && isIngredientContent ? "primary" : "secondary";

  const classNameBunPlus = `${isHoverBunTop || isHoverBunBottom ? componentsLayout.plus : ''}`;
  const classNameBunStart = `${componentsLayout.start} ${isHoverBunTop || isHoverBunBottom ? componentsLayout.onHover : ''}`;
  const classNameTopBun = `${classNameBunStart} text text_type_main-medium pb-4 pt-4 mb-4 ml-9 mr-1`;
  const classNameBottomBun = `${classNameBunStart} text text_type_main-medium pb-4 pt-4 mt-4 mb-4 ml-9 mr-1`;
  const classNameIngredientsPlus =
    `${componentsLayout.components} ${isIngredientContent && isHoverIngredient ? componentsLayout.plus : ''}`;
  const classNameIngredients =
    `${componentsLayout.start} ${isHoverIngredient ? componentsLayout.onHover : ''}`;
  const classNameIngredientsFull = `${classNameIngredients} text text_type_main-medium pb-4 pt-4 ml-9 mr-1`;

  return (
    <section className={componentsLayout.boxMain}>
      <div ref={dropBunTopTarget} >
        {isBunContent
          ? <div className={classNameBunPlus}><BurgerComponent component={burger[0]} type = "top" /></div>
          : (<h3 className={classNameTopBun}>Выберите булку</h3>)
        }
      </div>

      <div className={classNameIngredientsPlus} ref={dropIngredientTarget} >
        {isIngredientContent
          ? burger.map((item, index) =>
            item.type !== 'bun'
            && item.type !== 'blank'
            && <BurgerComponent component={item} key={item.key} index={index} moveHandler={moveHandler} />)
          : (<h3 className={classNameIngredientsFull}>Вложите ингредиенты</h3>)
        }
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
        <div className={componentsLayout.icon} ><CurrencyIcon type="primary" /></div>
        <span className="text text_type_digits-medium">{total}</span>
      </div>
    </section>
  )
}

export default BurgerConstructor;
