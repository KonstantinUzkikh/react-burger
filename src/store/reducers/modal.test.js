import { initialModalState, modalReducer } from './modal'
import * as types from '../action-types/index'

describe('modalReducer', () => {
  it('должен вернуть initial state', () => {
    expect(modalReducer(undefined, {})).toEqual(initialModalState)
  })

  it('OPEN_MODAL', () => {
    expect(modalReducer(
      undefined,
      {type: types.OPEN_MODAL, title: 'Модальное окно', modalContent: 'test', resetContentFunc: 'func'}))
      .toEqual({isModalOpen: true, title: 'Модальное окно', modalContent: 'test', resetContentFunc: 'func'})
  })

  it('CLOSE_MODAL', () => {
    expect(modalReducer(undefined, {type: types.CLOSE_MODAL})).toEqual(initialModalState)
  })

})
