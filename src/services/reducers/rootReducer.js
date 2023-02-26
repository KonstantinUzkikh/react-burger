import { combineReducers } from 'redux';

import { burgerIngradientsReducer } from './burger-ingradients';
import { burgerConstructorReducer } from './burger-constructor';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderDetailsReducer } from './order-details';
import { modalReducer } from './modal';
import { profileReducer } from './profile';

export const rootReducer = combineReducers({
  ingredients: burgerIngradientsReducer,
  constructorContent: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  modal: modalReducer,
  profile: profileReducer,
})
