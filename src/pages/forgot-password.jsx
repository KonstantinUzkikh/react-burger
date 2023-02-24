import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import { EmailInput, Button, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import pageLayout from './page.module.css'
import { h3_type, letters_grey, letters } from '../utils/types.js';
import { readUserData } from '../utils/cookies';
import { setProfileFormValue } from '../services/actions/form';
import { getForgotPassword } from '../services/get-data';

function ForgotPasswordPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email } = useSelector(state => state.form);

  const onChange = (e) => dispatch(setProfileFormValue(e.target.name, e.target.value));

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getForgotPassword(email, () => navigate('/reset-password')));
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
          onChange={onChange}
          icon={'EditIcon'}
          value={email}
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
