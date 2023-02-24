import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import { Input, EmailInput, PasswordInput, Button, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import pageLayout from './page.module.css'
import { h3_type, letters_grey, letters } from '../utils/types.js';
import { readUserData } from '../utils/cookies';
import { setProfileFormValue, cancelInputs } from '../services/actions/form'
import { getProfile } from '../services/get-data';

function RegisterPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { dispatch(cancelInputs()) }, []);

  const { name, email, password } = useSelector(state => state.form);

  const onChange = (e) => dispatch(setProfileFormValue(e.target.name, e.target.value));

  const onSubmit = (e) => {
    e.preventDefault();
    //dispatch(getProfile('register', {name, email, password}, () => navigate('/')));
    dispatch(getProfile('register', { name, email, password }, () => navigate('/')));
  }

  const onLogin = () => navigate('/login');

  const isEMail = true; // ДОРАБОТАТЬ ЛОГИКУ
  const isPassword = true;
  const isName = true;
  const typeButton = isEMail && isPassword && isName ? "primary" : "secondary";

  const { email: emailUser } = readUserData();
  if (emailUser !== undefined) {
    return (
      <Navigate to={'/'} />
    );
  }

  return (
    <div className={pageLayout.boxPage}>
      <form className={pageLayout.boxForm} onSubmit={onSubmit}>
        <h3 className={h3_type}>Регистрация</h3>
        <Input
          onChange={onChange}
          icon={'EditIcon'}
          type={'text'}
          placeholder={'Имя'}
          value={name}
          name={'name'}
          size={'default'}
          extraClass="mt-6"
        />
        <EmailInput
          onChange={onChange}
          icon={'EditIcon'}
          value={email}
          name={'email'}
          extraClass="mt-6"
        />
        <PasswordInput
          onChange={onChange}
          icon={'EditIcon'}
          value={password}
          name={'password'}
          extraClass="mt-6"
        />
        <div className={pageLayout.buttonSubmit}>
          <Button htmlType="submit" type={typeButton} size="medium">
            Зарегистрироваться
          </Button>
        </div>
        <div className={pageLayout.boxGo}>
          <span className={letters_grey}>Уже зарегистрированы?</span>
          <button className={`${letters} ${pageLayout.buttonGo}`} onClick={onLogin}>Войти</button>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage
