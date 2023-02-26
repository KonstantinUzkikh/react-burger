import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import { EmailInput, Button, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import pageLayout from './page.module.css'
import { h3_type, letters_grey, letters } from '../utils/types.js';
import { readUserData } from '../utils/cookies';
import { getForgotPassword } from '../services/get-data';
import { useForm } from '../hooks/useForm';

function ForgotPasswordPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {values, handleChange } = useForm({email: ''});

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getForgotPassword(values, () => navigate('/reset-password')));
  }

  const onLogin = () => navigate('/login');

  const isEMail = true; // ДОРАБОТАТЬ ЛОГИКУ
  const typeButton = isEMail ? "primary" : "secondary";

  const { email: emailUser } = readUserData();
  if (emailUser !== undefined) {
    return (
      <Navigate to={'/'} />
    );
  }

  return (
    <div className={pageLayout.boxPage}>
      <form className={pageLayout.boxForm} onSubmit={onSubmit}>
        <h3 className={h3_type}>Восстановление пароля</h3>
        <EmailInput
          placeholder={'Укажите e-mail'}
          onChange={handleChange}
          icon={'EditIcon'}
          value={values.email}
          name={'email'}
          extraClass="mt-6"
        />
        <div className={pageLayout.buttonSubmit}>
          <Button htmlType="submit" type={typeButton} size="medium">
            Восстановить
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

export default ForgotPasswordPage
