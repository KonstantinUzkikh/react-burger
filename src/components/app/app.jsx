import React from 'react';

// eslint-disable-next-line no-unused-vars
import { Box } from '@ya.praktikum/react-developer-burger-ui-components';

import { ingredientsUrl } from '../../utils/constants.js';
import { request } from '../api/api.js';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingradients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
// eslint-disable-next-line no-unused-vars
import appLayout from './app.module.css'

// временный импорт (на период разработки)
import { bun } from '../../utils/constants.js';

function App() {

  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    ingredients: []
  })

  const {isLoading, hasError, ingredients } = state;

  React.useEffect(() => {

    setState({ ...state, isLoading: true });

    request(ingredientsUrl)
      .then(data => {
        setState({ ...state, isLoading: false, ingredients: data.data.map((item) => {
          // временное условие (на период разработки). Оставить: item.count = null
          if (item._id === "60d3b41abdacab0026a733c6") {
            item.count = 2} else {
            item.count = null
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
          <header>
            <AppHeader />
          </header>
          <main>
            <BurgerIngredients data={ingredients}/>
            <BurgerConstructor bun={bun} data={ingredients} />
          </main>
        </div>
      }
    </>
  );
}

export default App;
