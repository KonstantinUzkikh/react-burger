import { initialIngradientsState, ingradientsReducer } from './burger-ingradients'
import * as types from '../action-types/index'
import {
  bun1_count0, bun1_count2, main_count0, main_count1, sauce_count0, sauce_count1
} from '../../utils/mock-ingredients';

describe('ingradientsReducer', () => {
  it('должен вернуть initial state', () => {
    expect(ingradientsReducer(undefined, {})).toEqual(initialIngradientsState)
  })

  it('GET_INGREDIENTS_SUCCESS', () => {
    expect(ingradientsReducer(
      initialIngradientsState,
      { type: types.GET_INGREDIENTS_SUCCESS, ingredients: [bun1_count0, main_count0, sauce_count0] }))
      .toEqual({ isLoadIngredients: true, ingredients: [bun1_count0, main_count0, sauce_count0] })
  })

  it('SET_DOUBLE_COUNT_BUN', () => {
    expect(ingradientsReducer(
      { isLoadIngredients: true, ingredients: [bun1_count0, main_count0, sauce_count0] },
      { type: types.SET_DOUBLE_COUNT_BUN, _id: bun1_count0._id }))
      .toEqual({ isLoadIngredients: true, ingredients: [bun1_count2, main_count0, sauce_count0] })
  })

  it('RESET_COUNT_BUN', () => {
    expect(ingradientsReducer(
      { isLoadIngredients: true, ingredients: [bun1_count2, main_count0, sauce_count0] },
      { type: types.RESET_COUNT_BUN, _id: bun1_count0._id }))
      .toEqual({ isLoadIngredients: true, ingredients: [bun1_count0, main_count0, sauce_count0] })
  })

  it('RESET_COUNT_ALL_INGREDIENTS', () => {
    expect(ingradientsReducer(
      { isLoadIngredients: true, ingredients: [bun1_count2, sauce_count1, main_count1] },
      { type: types.RESET_COUNT_ALL_INGREDIENTS }))
      .toEqual({ isLoadIngredients: true, ingredients: [bun1_count0, sauce_count0, main_count0] })
  })

  it('INCREASE_COUNT_INGREDIENT', () => {
    expect(ingradientsReducer(
      { isLoadIngredients: true, ingredients: [bun1_count0, main_count0, sauce_count0] },
      { type: types.INCREASE_COUNT_INGREDIENT, _id: sauce_count0._id }))
      .toEqual({ isLoadIngredients: true, ingredients: [bun1_count0, main_count0, sauce_count1] })
  })

  it('DECREASE_COUNT_INGREDIENT', () => {
    expect(ingradientsReducer(
      { isLoadIngredients: true, ingredients: [bun1_count0, main_count1, sauce_count1] },
      { type: types.DECREASE_COUNT_INGREDIENT, _id: main_count0._id }))
      .toEqual({ isLoadIngredients: true, ingredients: [bun1_count0, main_count0, sauce_count1] })
  })

})
