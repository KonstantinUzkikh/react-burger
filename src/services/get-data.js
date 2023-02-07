import { BASE_URL } from '../utils/constants';
import { request } from '../components/api/api';
import { getIngredientsRequest, getIngredientsSuccess, getIngredientsFaild } from './actions/burger-ingradients';
import { getOrderRequest, getOrderSuccess, getOrderFaild } from './actions/order-details';

export function getIngredients() {
  return function(dispatch) {
    dispatch(getIngredientsRequest());
    request(`${BASE_URL}/ingredients`)
    .then(res => dispatch(getIngredientsSuccess(res)))
    .catch(err => dispatch(getIngredientsFaild(err)))
  };
}

export function getConfirmOrder(burger) {

  const orderOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ingredients: burger})
  }

  return function(dispatch) {
    dispatch(getOrderRequest());
    request(`${BASE_URL}/orders`, orderOptions)
    .then(res => dispatch(getOrderSuccess(res.name, res.order.number, burger)))
    .catch(err => dispatch(getOrderFaild(err)))
  };
}
