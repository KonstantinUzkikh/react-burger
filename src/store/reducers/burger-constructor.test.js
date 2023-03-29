import { initialConstructorState, burgerConstructorReducer } from './burger-constructor'
import * as types from '../action-types/index'
import { initialIngredient } from '../../utils'
import { bun1_count0, main_count0, sauce_count0 } from '../../utils/mock-ingredients';

describe('burgerConstructorReducer', () => {
  it('должен вернуть initial state', () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual(initialConstructorState)
  })

  it('ADD_BURGER_INGREDIENT', () => {
    expect(burgerConstructorReducer(
      initialConstructorState,
      {type: types.ADD_BURGER_INGREDIENT, ingredient: main_count0}))
      .toEqual({burger: [...initialConstructorState.burger, main_count0]})
  })

  it('DELETE_BURGER_INGREDIENT', () => {
    expect(burgerConstructorReducer(
      {burger: [...initialConstructorState.burger, main_count0]},
      {type: types.DELETE_BURGER_INGREDIENT, key: main_count0.key}))
      .toEqual(initialConstructorState)
  })

  it('UPDATE_BURGER_BUN', () => {
    expect(burgerConstructorReducer(
      initialConstructorState,
      {type: types.UPDATE_BURGER_BUN, ingredient: bun1_count0}))
      .toEqual({burger: [bun1_count0]})
  })

  it('MOVE_BURGER_INGREDIENT', () => {
    expect(burgerConstructorReducer(
      {burger: [bun1_count0, main_count0, sauce_count0]},
      {type: types.MOVE_BURGER_INGREDIENT, dragIndex: 1, hoverIndex: 2}))
      .toEqual({burger: [bun1_count0, sauce_count0, main_count0 ]})
  })

  it('RESET_BURGER', () => {
    expect(burgerConstructorReducer(
      {burger: [bun1_count0, sauce_count0, main_count0 ]},
      {type: types.RESET_BURGER}))
      .toEqual({burger: [initialIngredient]})
  })

})
