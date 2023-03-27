import type { Middleware } from 'redux';

import type { TAppActions } from '../types-store';
import {
  WS_CONNECT, WS_OPENED, WS_CLOSED, WS_GET_ERROR, WS_GET_MESSAGE,
  WS_AUTH_CONNECT, WS_AUTH_OPENED, WS_AUTH_CLOSED, WS_AUTH_GET_ERROR
} from '../action-types';
import { wsFlagUp, wsFlagDown, wsError, wsGetOrders } from '../actions';
import { TIngredient, TOrdersData } from '../../utils';
import { TWSMessage } from '../../services/types-responses';

export const wsDataMiddleware = (): Middleware => {

  let isFlagUp = false;

  return store => next => (action: TAppActions) => {

    const normolizeOrders = (message: TWSMessage): TOrdersData => {

      const { ingredients } = getState().ingredients;

      let ordersData: TOrdersData = {
        orders: [],
        total: message.total,
        totalToday: message.totalToday
      };

      let arrIDBuns: string[] = [];
      let arrIDIngredients: string[] = [];

      ingredients.forEach((it: TIngredient) =>
        it.type === 'bun'
          ? arrIDBuns = [...arrIDBuns, it._id]
          : arrIDIngredients = [...arrIDIngredients, it._id]);

      // избавляемся от заказов с несуществующими _id инредиентов
      ordersData.orders = message.orders.filter(it =>
        it.ingredients.every(item => arrIDBuns.includes(item) || arrIDIngredients.includes(item))
      );

      // избавляемся от заказов без инредиентов
      ordersData.orders = ordersData.orders.filter(it =>
        it.ingredients.some(item => arrIDIngredients.includes(item))
      );

      // избавляемся от заказов без булок
      ordersData.orders = ordersData.orders.filter(it =>
        it.ingredients.some(item => arrIDBuns.includes(item))
      );

      //избавляемся от заказов, в которых булка включена больше одного раза
      ordersData.orders = ordersData.orders.filter(it =>
        it.ingredients.reduce((prev, item) => arrIDBuns.includes(item) ? ++prev : prev, 0) === 1
      );

      //переставляем булку первым элементом в заказе
      ordersData.orders.forEach(it => it.ingredients.sort(item => arrIDBuns.includes(item) ? -1 : 1));

      return ordersData
    }

    // основная часть middleware
    const { dispatch, getState } = store;
    const { type } = action;

    if (type === (WS_CONNECT || WS_AUTH_CONNECT) && !isFlagUp) {
      dispatch(wsFlagUp('orders'));
      isFlagUp = true;
    };

    if (type === (WS_OPENED || WS_AUTH_OPENED) && isFlagUp) {
      dispatch(wsFlagDown());
      isFlagUp = false;
    };

    if (type === (WS_GET_ERROR || WS_AUTH_GET_ERROR)) dispatch(wsError());

    if (type === (WS_CLOSED || WS_AUTH_CLOSED)) isFlagUp = false;

    if (type === WS_GET_MESSAGE && action.message.orders?.length > 0)
      dispatch(wsGetOrders(normolizeOrders(action.message)));

    next(action);
  }
};
