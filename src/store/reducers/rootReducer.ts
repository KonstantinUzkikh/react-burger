import { combineReducers } from 'redux';

import { burgerIngradientsReducer, burgerConstructorReducer, ingredientDetailsReducer, orderDetailsReducer, modalReducer,
  apiReducer, profileReducer, wsReducer, wsAuthReducer
} from './';

export const rootReducer = combineReducers({
  ingredients: burgerIngradientsReducer,
  constructorContent: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  modal: modalReducer,
  api: apiReducer,
  profile: profileReducer,
  ws: wsReducer,
  wsAuth: wsAuthReducer
})
