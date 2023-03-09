import { FC, FormEvent } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';

import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch } from '../store/hooks';
import pageLayout from './page.module.css'
import { h3_type, letters_grey, letters } from '../utils/types';

import { checkLogin } from '../utils/utils';
import { getLoginThunk } from '../store/thunks/login'
import { useForm } from '../hooks/useForm';

const LoginPage: FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { values, handleChange } = useForm({ email: '', password: '' });

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(getLoginThunk(values, () => navigate('/')));
  }

  const onRegister = () => navigate('/register');
  const onForgotPassword = () => navigate('/forgot-password');

  const from = location.state?.from || '/';

  if (checkLogin()) {
    return (
      <Navigate to={from} />
    );
  }

  return (
    <div className={pageLayout.boxPage}>
      <form className={pageLayout.boxForm} onSubmit={onSubmit}>
        <h3 className={h3_type}>Вход</h3>
        <EmailInput
          onChange={handleChange}
          isIcon={true}
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
          <Button htmlType="submit" size="medium">
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
