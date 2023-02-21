import { setType } from './common';

export const SET_PROFILE_FORM_VALUE = 'SET_PROFILE_FORM_VALUE';
export const SET_INPUTS = 'SET_INPUTS';
export const CANCEL_INPUTS = 'CANCEL_INPUTS';

export const setProfileFormValue = (field, value) => {
  return {
    type: SET_PROFILE_FORM_VALUE,
    field: field,
    value: value
  }
};

export const setInputs = (name, email, password) => {
  return {
    type: SET_INPUTS,
    name: name,
    email: email,
    password: password
  }
};

export const cancelInputs = () => setType(CANCEL_INPUTS);
