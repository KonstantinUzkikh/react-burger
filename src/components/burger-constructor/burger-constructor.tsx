import { useCallback, useRef, FC } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { useNavigate } from 'react-router-dom';

import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as generateKey } from 'uuid';

import { useSelector, useDispatch } from '../../store/hooks';
import { getConfirmOrderThunk } from '../../store/thunks';
import { checkLogin } from '../../utils/utils';
import { h3_type  } from '../../utils/types';
import { TIngredient  } from '../../utils/types-data';
import componentsLayout from './burger-constructor.module.css';

import { openModal } from '../../store/actions/modal';
import { orderIdReset } from '../../store/actions/order-details';
import { addBurgerIngredient, deleteBurgerIngredient, updateBurgerBun, cancelBurger, moveBurgerIngredient }
  from '../../store/actions/burger-constructor';
import { increaseCountIngredient, decreaseCountIngredient, cancelCountBun, setCountBun, cancelCountAllIngredients }
  from '../../store/actions/burger-ingradients';

type TBurgerComponentProps = {
  side?: 'top' | 'bottom';
  component: TIngredient;
  index?: number;
  moveHandler?: (dragIndex: number, hoverIndex: number) => void
}

const BurgerComponent: FC<TBurgerComponentProps> = ({ side: type, component, index = 0, moveHandler }) => {

  const dispatch = useDispatch();
  const ref = useRef<any>(null);

  const { key, _id } = component;

  const onDelete = useCallback(() => {
    dispatch(deleteBurgerIngredient(key));
    dispatch(decreaseCountIngredient(_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [{ handlerId }, drop] = useDrop({
    accept: 'burger ingredient',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: any, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset: any = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      if(moveHandler !== undefined) moveHandler(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'burger ingredient',
    item: () => {
      return { key, index }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  let text = '';
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
    <div className={componentsLayout.component} style={{ opacity }} ref={ref} data-handler-id={handlerId}>
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

function BurgerConstructor() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { burger } = useSelector(state => state.constructorContent);
  const { ingredients } = useSelector(state => state.ingredients);

  const total = useSelector(state => {
    const burger:TIngredient[] = state.constructorContent.burger;
    if (burger.length > 0) {
      return burger.reduce((previousValue: number, item: TIngredient) => previousValue + item.price * item.count, 0)
    } else {
      return 0;
    };
  });

  const moveIngredientToBurger = (_id: string): void => {
    dispatch(
      addBurgerIngredient(
        { ...ingredients.filter((item: TIngredient) => item._id === _id)[0], count: 1, key: generateKey() }
      )
    );
    dispatch(increaseCountIngredient(_id));
  }

  const moveBunToBurger = (_id: string): void => {
    burger[0].type === 'bun' && dispatch(cancelCountBun(burger[0]._id));
    dispatch(updateBurgerBun(
      { ...ingredients.filter((item: TIngredient) => item._id === _id)[0], count: 2, key: generateKey() }
    ));
    dispatch(setCountBun(ingredients.filter((item: TIngredient) => item._id === _id)[0]._id));
  }

  const moveHandler = useCallback((dragIndex: number, hoverIndex: number): void => {
    dispatch(moveBurgerIngredient(dragIndex, hoverIndex));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const makeOrder = () => {
    function setCancelOrderDetails() {
      return function (dispatch: any) {
        dispatch(orderIdReset());
        dispatch(cancelBurger());
        dispatch(cancelCountAllIngredients());
      }
    }

    if (!checkLogin()) navigate('/login')
    else {
      if (isBunContent && isIngredientContent) {
        dispatch(getConfirmOrderThunk(burger));
        dispatch(openModal('', 'order', setCancelOrderDetails));
      }
    }
  };

  const [{ isHoverIngredient }, dropIngredientTarget] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHoverIngredient: monitor.isOver()
    }),
    drop(item: any) { moveIngredientToBurger(item._id) }
  });

  const [{ isHoverBunTop }, dropBunTopTarget] = useDrop({
    accept: 'bun',
    collect: monitor => ({
      isHoverBunTop: monitor.isOver()
    }),
    drop(item: any) { moveBunToBurger(item._id) }
  });

  const [{ isHoverBunBottom }, dropBunBottomTarget] = useDrop({
    accept: 'bun',
    collect: monitor => ({
      isHoverBunBottom: monitor.isOver()
    }),
    drop(item: any) { moveBunToBurger(item._id) }
  });

  const isBunContent = burger[0].type === 'bun';
  const isIngredientContent = burger.length > 1;
  const typeButton = isBunContent && isIngredientContent ? "primary" : "secondary";

  const classNameBunPlus = `${isHoverBunTop || isHoverBunBottom ? componentsLayout.plus : ''}`;
  const classNameBunStart = `${componentsLayout.start} ${isHoverBunTop || isHoverBunBottom ? componentsLayout.onHover : ''}`;
  const classNameTopBun = `${classNameBunStart} ${h3_type} pb-4 pt-4 mb-4 ml-9 mr-1`;
  const classNameBottomBun = `${classNameBunStart} ${h3_type} pb-4 pt-4 mt-4 mb-4 ml-9 mr-1`;
  const classNameIngredientsPlus =
    `${componentsLayout.components} ${isIngredientContent && isHoverIngredient ? componentsLayout.plus : ''}`;
  const classNameIngredients =
    `${componentsLayout.start} ${isHoverIngredient ? componentsLayout.onHover : ''}`;
  const classNameIngredientsFull = `${classNameIngredients} ${h3_type} pb-4 pt-4 ml-9 mr-1`;

  return (
    <section className={componentsLayout.boxMain}>
      <div ref={dropBunTopTarget} >
        {isBunContent
          ? <div className={classNameBunPlus}><BurgerComponent component={burger[0]} side="top" /></div>
          : (<h3 className={classNameTopBun}>Выберите булку</h3>)
        }
      </div>

      <div className={classNameIngredientsPlus} ref={dropIngredientTarget} >
        {isIngredientContent
          ? burger.map((item: TIngredient, index: number) =>
            item.type !== 'bun'
            && item.type !== 'blank'
            && <BurgerComponent component={item} key={item.key} index={index} moveHandler={moveHandler} />)
          : (<h3 className={classNameIngredientsFull}>Вложите ингредиенты</h3>)
        }
      </div>

      <div ref={dropBunBottomTarget} >
        {isBunContent
          ? <div className={classNameBunPlus}><BurgerComponent component={burger[0]} side="bottom" /></div>
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
