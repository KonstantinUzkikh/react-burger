import { ingredientsUrl } from '../utils/constants';
import { orderUrl } from '../utils/constants';
import { request } from '../components/api/api';

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from './actions/burger-ingradients';

import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED
} from './actions/order-details';

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    request(ingredientsUrl)
    .then(res => {
      res.success
      ? dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: res.data.map((item) => {
          item.count = 0;
          return (item);
        })
      })
      : console.log(`success: ${res.success}`);
    })
    .catch(err => {
      dispatch({
        type: GET_INGREDIENTS_FAILED
      });
      console.log(err);
    });
  };
}

export function getConfirmOrder(burger) {

  const orderOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ingredients: burger})
  }

  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    request(orderUrl, orderOptions)
    .then(res => {
      res.success
      ? dispatch({
        type: GET_ORDER_SUCCESS,
        nameOrderedBurger: res.name,
        orderId: res.order.number,
        burger: burger
      })
      : console.log(`success: ${res.success}`);
    })
    .catch(err => {
      dispatch({
        type: GET_ORDER_FAILED
      });
      console.log(err);
    });
  };
}
