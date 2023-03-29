import { initialOrderDetailsState, orderDetailsReducer } from './order-details'
import * as types from '../action-types/index'

describe('orderDetailsReducer', () => {
  it('должен вернуть initial state', () => {
    expect(orderDetailsReducer(undefined, {})).toEqual(initialOrderDetailsState)
  })

  it('GET_ORDER_ID_SUCCESS', () => {
    expect(orderDetailsReducer(
      initialOrderDetailsState,
      {type: types.GET_ORDER_ID_SUCCESS, nameBurger: 'nameBurger', orderId: 43568}))
      .toEqual({isOrder: true, nameBurger: 'nameBurger', orderId: 43568})
  })

  it('ORDER_ID_RESET', () => {
    expect(orderDetailsReducer(
      {isOrder: true, nameBurger: 'nameBurger', orderId: 43568},
      {type: types.ORDER_ID_RESET}))
      .toEqual(initialOrderDetailsState)
  })

})
