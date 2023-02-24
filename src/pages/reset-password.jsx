import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import { PasswordInput, Input, Button, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import pageLayout from './page.module.css'
import { h3_type, letters_grey, letters } from '../utils/types.js';
import { readUserData, readForgot } from '../utils/cookies';
import { setProfileFormValue } from '../services/actions/form';
import { getResetPassword } from '../services/get-data';

function ResetPasswordPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { newPassword, code } = useSelector(state => state.form);

  const onChange = (e) => dispatch(setProfileFormValue(e.target.name, e.target.value));

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getResetPassword(newPassword, code, () => navigate('/')));
  }

  const onLogin = () => navigate('/login');

  const isPassword = true; // ДОРАБОТАТЬ ЛОГИКУ
  const isCheckCode = true;
  const typeButton = isPassword && isCheckCode ? "primary" : "secondary";

  const { email: emailUser } = readUserData();
  const forgot = readForgot();
  if (emailUser !== undefined) {
    return (
      <Navigate to={'/'} />
    );
  } else {
    if (forgot === undefined) {
      return (
        <Navigate to={'/forgot-password'} />
      );
    }
  }

  return (
    <div className={pageLayout.boxPage}>
      <form className={pageLayout.boxForm} onSubmit={onSubmit}>
        <h3 className={h3_type}>Восстановление пароля</h3>
        <PasswordInput
          placeholder={'Введите новый пароль'}
          onChange={onChange}
          value={newPassword}
          name={'newPassword'}
          extraClass="mt-6"
        />
        <Input
          onChange={onChange}
          icon={'EditIcon'}
          type={'text'}
          placeholder={'Введите код из письма'}
          value={code}
          name={'code'}
          size={'default'}
          extraClass="mt-6"
        />
        <div className={pageLayout.buttonSubmit}>
          <Button htmlType="submit" type={typeButton}>
            Сохранить
          </Button>
        </div>
        <div className={`${pageLayout.boxGo} mb-4`}>
          <span className={letters_grey}>Вспомнили пароль?</span>
          <button className={`${letters} ${pageLayout.buttonGo}`} onClick={onLogin}>Войти</button>
        </div>
      </form>
    </div>
  )
}

export default ResetPasswordPage
