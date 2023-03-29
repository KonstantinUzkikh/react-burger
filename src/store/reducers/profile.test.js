import { initialProfileState, profileReducer } from './profile'
import * as types from '../action-types/index'

describe('profileReducer', () => {
  it('должен вернуть initial state', () => {
    expect(profileReducer(undefined, {})).toEqual(initialProfileState)
  })

  it('GET_PROFILE_SUCCESS', () => {
    expect(profileReducer(
      initialProfileState,
      {type: types.GET_PROFILE_SUCCESS, name: 'name', email: 'email', password: 'password'}))
      .toEqual({isLoadProfile: true, name: 'name', email: 'email', password: 'password'})
  })

  it('PROFILE_RESET', () => {
    expect(profileReducer(
    {isLoadProfile: true, name: 'name', email: 'email', password: 'password'},
    {type: types.PROFILE_RESET}))
    .toEqual(initialProfileState)
  })

})
