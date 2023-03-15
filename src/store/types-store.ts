import { ThunkAction } from 'redux-thunk';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { rootReducer } from './reducers/rootReducer';
import {
  TApiActions, TBurgerConstructorActions, TBurgerIngredientsActions, TCurrentIngredientActions, TModalActions,
  TOrderIdActions, TProfileActions, TWSActions, TWSAuthActions
} from './action-types';

export type TAppActions = TApiActions | TBurgerConstructorActions | TBurgerIngredientsActions
  | TCurrentIngredientActions | TModalActions | TOrderIdActions | TProfileActions | TWSActions | TWSAuthActions;

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TAppActions>;

export type AppDispatch<TReturnType = void> = (action: TAppActions | AppThunk<TReturnType>) => TReturnType;
