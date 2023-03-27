import { initialWSState, wsReducer } from './ws'
import * as types from '../action-types/index'

const ordersArr = [
  {
    name: "Interstellar бургер",
    ingredients: [
      "60d3b41abdacab0026a733c6",
      "60d3b41abdacab0026a733d3",
      "60d3b41abdacab0026a733ce",
      "60d3b41abdacab0026a733d0",
      "60d3b41abdacab0026a733c9",
      "60d3b41abdacab0026a733d1",
      "60d3b41abdacab0026a733d0",
      "60d3b41abdacab0026a733ce",
      "60d3b41abdacab0026a733d3"
    ],
    _id: "034534Fvd",
    status: "done",
    number: 43551,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z"
  },
  {
    name: "Another бургер",
    ingredients: [
      "60d3b41abdacab0026a733c6",
      "60d3b41abdacab0026a733d3",
      "60d3b41abdacab0026a733ce",
      "60d3b41abdacab0026a733d3"
    ],
    _id: "034534Sno",
    status: "done",
    number: 43551,
    createdAt: "2022-06-23T14:43:22.587Z",
    updatedAt: "2022-06-23T14:43:22.603Z"
  }
]

describe('wsReducer', () => {
  it('должен вернуть initial state', () => {
    expect(wsReducer(undefined, {})).toEqual(initialWSState)
  })

  it('WS_GET_ORDERS', () => {
    expect(wsReducer(
      initialWSState,
      {type: types.WS_GET_ORDERS, data: {orders: ordersArr, total: 43568, totalToday: 115}}))
      .toEqual({orders: ordersArr, total: 43568, totalToday: 115})
  })

  it('WS_RESET_ORDERS', () => {
    expect(wsReducer(
      {orders: ordersArr, total: 43568, totalToday: 115},
      {type: types.WS_RESET_ORDERS}))
      .toEqual(initialWSState)
  })

})
