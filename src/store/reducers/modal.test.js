import { initialState, modalReducer } from './modal'
import * as types from '../action-types/index'

const storeOpenModal = {
  isModalOpen: true,
  title: 'Тест: открытие модального окна',
  modalContent: 'test',
  resetContentFunc: 'func'
}

const actionOpenModal = {
  type: types.OPEN_MODAL,
  title: 'Тест: открытие модального окна',
  modalContent: 'test',
  resetContentFunc: 'func'
}

const actionCloseModal = {
  type: types.CLOSE_MODAL,
}

describe('modal reducer', () => {
  it('должен вернуть initial state', () => {
    expect(modalReducer(undefined, {}))
      .toEqual(initialState)
  })

  it('должен обрабатывать OPEN_MODAL', () => {
    expect(
      modalReducer(initialState, actionOpenModal))
      .toEqual(storeOpenModal)
  })

  it('должен обрабатывать CLOSE_MODAL', () => {
    expect(modalReducer(initialState, actionCloseModal))
      .toEqual(initialState)

    expect(
      modalReducer(storeOpenModal, actionCloseModal))
      .toEqual(initialState)
  })

})
