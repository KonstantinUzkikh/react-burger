import React from 'react';

// eslint-disable-next-line no-unused-vars
import { Box } from '@ya.praktikum/react-developer-burger-ui-components';

import { getIngredients } from '../api/api.js';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingradients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
// eslint-disable-next-line no-unused-vars
import appLayout from './app.module.css'

  // временные константы (на период разработки)
  const top ={
    carbohydrates: 53,
    calories: 420,
    fat: 24,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    name: "Краторная булка N-200i",
    price: 1255,
    proteins: 80,
    type: "bun",
    __v: 0,
    _id: "60d3b41abdacab0026a733c6"
  }
  const bottom = {
    carbohydrates: 85,
    calories: 643,
    fat: 26,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    name: "Флюоресцентная булка R2-D3",
    price: 988,
    proteins: 44,
    type: "bun",
    __v: 0,
    _id: "60d3b41abdacab0026a733c7"
  }

const countValue = null;

function App() {

  const ingredientsUrl = 'https://norma.nomoreparties.space/api/ingredients';

  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    ingredients: []
  })

  const {isLoading, hasError, ingredients } = state;

  React.useEffect(() => {
    setState({ ...state, isLoading: true });

    getIngredients(ingredientsUrl)
      .then(data => {
        setState({ ...state, isLoading: false, ingredients: data.data.map((item) => {
          // временное условие (на период разработки)
          if ((item._id === "60d3b41abdacab0026a733c6") || (item._id ===  "60d3b41abdacab0026a733c7")) {
            item.count = 1} else {
            item.count = countValue
          };
          return (item);
        }) });
      })
      .catch(e => {
        setState({ ...state, isLoading: false, hasError: true });
        console.log(e);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isLoading && 'Загрузка...'}
      {hasError && 'Произошла ошибка'}
      {!isLoading && !hasError &&
        <div>
          <header className="mb-4 mt-4">
            <AppHeader />
          </header>
          <main>
            <BurgerIngredients data={ingredients}/>
            <BurgerConstructor top={top} bottom={bottom} data={ingredients} />
          </main>
        </div>
      }
    </>
  );
}

export default App;
