import { FC, FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch } from '../store/hooks-store';
import { checkLogin, readForgot, h3_type, letters_grey, letters } from '../utils';
import { getResetPasswordThunk } from '../store/thunks';
import { useForm } from '../hooks/useForm';
import pageLayout from './page.module.css'

const ResetPasswordPage: FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {values, handleChange } = useForm({newPassword: '', code: ''});

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(getResetPasswordThunk(values, () => navigate('/login')));
  }

  const onLogin = () => navigate('/login');

  const isPassword = true; // ДОРАБОТАТЬ ЛОГИКУ
  const isCheckCode = true;
  const typeButton = isPassword && isCheckCode ? "primary" : "secondary";

  if (checkLogin()) {
    return (
      <Navigate to={'/'} />
    );
  } else {
    if (readForgot() === undefined) {
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
