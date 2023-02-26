import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import { EmailInput, PasswordInput, Button, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import pageLayout from './page.module.css'
import { h3_type, letters_grey, letters } from '../utils/types.js';

import { readUserData } from '../utils/cookies';
import { getProfile } from '../services/get-data';
import { useForm } from '../hooks/useForm';

function LoginPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {values, handleChange } = useForm({email: '', password: ''});

  const [isError, setIsError] = useState(false);

  const onError = () => {
    setIsError(true);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getProfile('login', values, () => navigate('/')));
  }

  const onRegister = () => navigate('/register');
  const onForgotPassword = () => navigate('/forgot-password');

  const typeButton = isError ? "secondary" : "primary" ; // ДОРАБОТАТЬ ЛОГИКУ

  const from = location.state?.from || '/';
  const { email: emailUser } = readUserData();
  if (emailUser !== undefined) {
    return (
      <Navigate to={ from } />
    );
  }

  return (
    <div className={pageLayout.boxPage}>
      <form className={pageLayout.boxForm} onSubmit={onSubmit}>
        <h3 className={h3_type}>Вход</h3>
        <EmailInput
          onChange={handleChange}
          icon={'EditIcon'}
          value={values.email}
          name={'email'}
          extraClass="mt-6"
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={'password'}
          extraClass="mt-6"
        />
        <div className={pageLayout.buttonSubmit}>
          <Button htmlType="submit" type={typeButton} size="medium" disabled={isError}>
            Войти
          </Button>
        </div>
        <div className={`${pageLayout.boxGo} mb-4`}>
          <span className={letters_grey}>Вы — новый пользователь?</span>
          <button className={`${letters} ${pageLayout.buttonGo}`} onClick={onRegister}>Зарегистрироваться</button>
        </div>
        <div className={pageLayout.boxGo}>
          <span className={letters_grey}>Забыли пароль?</span>
          <button className={`${letters} ${pageLayout.buttonGo}`} onClick={onForgotPassword}>Восстановить пароль</button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
