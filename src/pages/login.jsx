import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import { EmailInput, PasswordInput, Button, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import pageLayout from './page.module.css'
import { h3_type, letters_grey, letters } from '../utils/types.js';

import { readUserData } from '../utils/cookies';
import { setProfileFormValue, cancelInputs } from '../services/actions/form';
import { getLoginProfile } from '../services/get-data';

function LoginPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { dispatch(cancelInputs()) }, []);
  const { email, password } = useSelector(state => state.form);

  const [isError, setIsError] = useState(false);

  const onChange = (e) => {
    dispatch(setProfileFormValue(e.target.name, e.target.value));
  }

  const onError = () => {
    setIsError(true);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    //dispatch(getProfile('login', {email, password}, () => navigate('/')));
    dispatch(getLoginProfile({email, password}, () => navigate('/')));
  }

  const onRegister = () => navigate('/register');

  const onForgotPassword = () => navigate('/forgot-password');

  const typeButton = isError ? "secondary" : "primary" ; // ДОРАБОТАТЬ ЛОГИКУ

  const { email: emailUser } = readUserData();
  if (emailUser !== undefined) {
    return (
      <Navigate to={'/'} />
    );
  }

  return (
    <div className={pageLayout.boxPage}>
      <form className={pageLayout.boxForm} onSubmit={onSubmit}>
        <h3 className={h3_type}>Вход</h3>
        <EmailInput
          onChange={onChange}
          value={email}
          name={'email'}
          isIcon={false}
          extraClass="mt-6"
        />
        <PasswordInput
          onChange={onChange}
          value={password}
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
