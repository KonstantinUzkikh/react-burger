import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import { PasswordInput, Input, Button, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import pageLayout from './page.module.css'
import { h3_type, letters_grey, letters } from '../utils/types.js';
import { readUserData, readForgot } from '../utils/cookies';
import { getResetPassword } from '../services/get-data';
import { useForm } from '../hooks/useForm';

function ResetPasswordPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {values, handleChange } = useForm({newPassword: '', code: ''});

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getResetPassword(values, () => navigate('/')));
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
          onChange={handleChange}
          value={values.newPassword}
          name={'newPassword'}
          extraClass="mt-6"
        />
        <Input
          onChange={handleChange}
          icon={'EditIcon'}
          type={'text'}
          placeholder={'Введите код из письма'}
          value={values.code}
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
