import { useRef, useState, useCallback, FC } from 'react';
import { useDrag } from "react-dnd";
import { Link, useLocation } from 'react-router-dom';

import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector } from '../../store/hooks-store';
import { TIngredient, h1_type, h3_type, letters, digits } from '../../utils';
import ingredientsLayout from './burger-ingredients.module.css';

const Ingredient: FC<{ data: TIngredient }> = ({ data }) => {

  const { _id, image, name, price, count } = data;
  const isCount = (count !== 0);
  const isBun = data.type === 'bun';

  const [, dragIngredientRef] = useDrag({
    type: 'ingredient',
    item: { _id }
  });

  const [, dragBunRef] = useDrag({
    type: 'bun',
    item: { _id }
  });

  return (
    <div
      className={ingredientsLayout.buttonIngradient}
      ref={isBun ? dragBunRef : dragIngredientRef}
    >
      <div className={ingredientsLayout.image}>
        <img src={image} alt={name} />
      </div>
      <div className={ingredientsLayout.price}>
        <span className={digits}>{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <div className={ingredientsLayout.name}>
        <p className={letters}>{name}</p>
      </div>
      <div className={ingredientsLayout.counter}>
        {isCount && (<Counter count={count} size="default" />)}
      </div>
    </div>
  );
};

const TypeIngredients: FC<{ type: 'bun' | 'main' | 'blank' | 'sauce' }> = ({ type }) => {

  const location = useLocation();
  const { ingredients } = useSelector(state => state.ingredients);

  let name: 'Булки' | 'Соусы' | 'Начинки' | '';
  let id: 'bun' | 'main' | 'blank' | 'sauce';
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
      id = 'blank';
      break;
  };

  return (
    <div className={ingredientsLayout.boxTypeIngredients}>
      <h3 id={id} className={`${h3_type} mb-6 mt-10`}>{name}</h3>
      <div className={ingredientsLayout.ingradients}>
        {// eslint-disable-next-line
          ingredients.map((item: TIngredient) => {
            if (item.type === type) {
              return (
                <Link
                  key={item._id}
                  to={`/ingredients/${item._id}`}
                  state={{ backgroundLocation: location }}
                  style={{ color: 'white' }}
                >
                  <Ingredient data={item} key={item._id} />
                </Link>
              )
            }
          })
        }
      </div>
    </div>
  );
};

const BurgerIngredients: FC = () => {

  const [currentTab, setCurrentTab] = useState('one');

  const refTub = useRef<any>(null);
  const refBun = useRef<any>(null);
  const refSauce = useRef<any>(null);
  const refMain = useRef<any>(null);

  const setCurrentTabBun = useCallback(() => {
    refBun.current.scrollIntoView({ behavior: 'smooth' })
    setCurrentTab('one');
  }, []);
  const setCurrentTabSauce = useCallback(() => {
    refSauce.current.scrollIntoView({ behavior: 'smooth' })
    setCurrentTab('two');
  }, []);
  const setCurrentTabMain = useCallback(() => {
    refMain.current.scrollIntoView({ behavior: 'smooth' })
    setCurrentTab('three');
  }, []);

  const setActiveTabFromPosition = () => {
    const distanceBunToTub = refBun.current.getBoundingClientRect().top - refTub.current.getBoundingClientRect().bottom;
    const distanceSauceToTub = refSauce.current.getBoundingClientRect().top - refTub.current.getBoundingClientRect().bottom;
    const distanceMainToTub = refMain.current.getBoundingClientRect().top - refTub.current.getBoundingClientRect().bottom;
    if (Math.abs(distanceBunToTub) < Math.abs(distanceSauceToTub)
      && Math.abs(distanceBunToTub) < Math.abs(distanceMainToTub)) { setCurrentTab('one') }
    if (Math.abs(distanceSauceToTub) < Math.abs(distanceBunToTub)
      && Math.abs(distanceSauceToTub) < Math.abs(distanceMainToTub)) { setCurrentTab('two') }
    if (Math.abs(distanceMainToTub) < Math.abs(distanceBunToTub)
      && Math.abs(distanceMainToTub) < Math.abs(distanceSauceToTub)) { setCurrentTab('three') }
  };

  return (
    <section>
      <h1 className={`${h1_type} mb-5 mt-9`}>Соберите бургер</h1>
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
