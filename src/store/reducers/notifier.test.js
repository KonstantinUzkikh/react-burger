import { initialNotifierState, notifierReducer } from './notifier'
import * as types from '../action-types/index'

describe('notifierReducer', () => {
  it('должен вернуть initial state', () => {
    expect(notifierReducer(undefined, {})).toEqual(initialNotifierState)
  })

  it('RESET_NOTIFIER', () => {
    expect(notifierReducer(undefined, {type: types.RESET_NOTIFIER})).toEqual(initialNotifierState)
  })

  it('API_FLAG_UP', () => {
    expect(notifierReducer(
      initialNotifierState,
      {type: types.API_FLAG_UP, source: 'ingredients'}))
      .toEqual({...initialNotifierState, source: 'ingredients', isAPI: true})
  })

  it('API_FLAG_DOWN', () => {
    expect(notifierReducer(
      {...initialNotifierState, source: 'ingredients', isAPI: true},
      {type: types.API_FLAG_DOWN, message: ''}))
      .toEqual({...initialNotifierState, source: 'ingredients', isAPI: false, isMessage: false, message: ''})
  })

  it('API_FLAG_DOWN (message)', () => {
    expect(notifierReducer(
      {...initialNotifierState, source: 'ingredients', isAPI: true},
      {type: types.API_FLAG_DOWN, message: 'message'}))
      .toEqual({...initialNotifierState, source: 'ingredients', isAPI: false, isMessage: true, message: 'message'})
  })

  it('API_ERROR', () => {
    expect(notifierReducer(
      {...initialNotifierState, source: 'ingredients', isAPI: true},
      {type: types.API_ERROR, error: 'error'}))
      .toEqual({...initialNotifierState, source: 'ingredients', error: 'error', isAPI: false, isError: true})
  })

  it('WS_FLAG_UP', () => {
    expect(notifierReducer(
      initialNotifierState,
      {type: types.WS_FLAG_UP, source: 'orders'}))
      .toEqual({...initialNotifierState, source: 'orders', isWS: true})
  })

  it('WS_FLAG_DOWN', () => {
    expect(notifierReducer(
      {...initialNotifierState, source: 'orders', isWS: true},
      {type: types.WS_FLAG_DOWN}))
      .toEqual({...initialNotifierState, source: 'orders', isWS: false})
  })

  it('WS_ERROR', () => {
    expect(notifierReducer(
      {...initialNotifierState, source: 'orders', isWS: true},
      {type: types.WS_ERROR}))
      .toEqual({...initialNotifierState, source: 'orders', error: 'Ошибка сокета.', isError: true, isWS: false})
  })

  it('ERROR', () => {
    expect(notifierReducer(
      initialNotifierState,
      {type: types.ERROR, error: 'error'}))
      .toEqual({...initialNotifierState, error: 'error', isError: true})
  })

})
