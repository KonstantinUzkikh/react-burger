import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// eslint-disable-next-line no-unused-vars
import { Box } from '@ya.praktikum/react-developer-burger-ui-components';

import { getIngredients } from '../../services/get-data';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ModalLoader from '../modal-loader/modal-loader';
// eslint-disable-next-line no-unused-vars
import appLayout from './app.module.css'

function App() {

  const { isLoadingIngredients, hasErrorIngredients } = useSelector(state => state.ingredients);

  const dispatch = useDispatch();

  useEffect(() => { dispatch(getIngredients()) }, [dispatch]);

  return (
    <>
      {isLoadingIngredients && 'Загрузка...'}
      {hasErrorIngredients && 'Произошла ошибка'}
      {!isLoadingIngredients && !hasErrorIngredients &&
        <>
          <header>
            <AppHeader />
          </header>
          <main>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor  />
            </DndProvider>
          </main>
        </>
      }
      <ModalLoader />
    </>
  );
}

export default App;
