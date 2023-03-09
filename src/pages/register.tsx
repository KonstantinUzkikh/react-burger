import { FC, FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch } from '../store/hooks';
import pageLayout from './page.module.css'
import { h3_type, letters_grey, letters } from '../utils/types';
import { checkLogin } from '../utils/utils';
import { getRegisterThunk } from '../store/thunks/register';
import { useForm } from '../hooks/useForm';

const RegisterPage: FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {values, handleChange } = useForm({name: '', email: '', password: ''});

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(getRegisterThunk(values, () => navigate('/')));
  }

  const onLogin = () => navigate('/login');

  const isEMail = true; // ДОРАБОТАТЬ ЛОГИКУ
  const isPassword = true;
  const isName = true;
  const typeButton = isEMail && isPassword && isName ? "primary" : "secondary";

  if (checkLogin()) {
    return (
      <Navigate to={'/'} />
    );
  }

  return (
    <div className={pageLayout.boxPage}>
      <form className={pageLayout.boxForm} onSubmit={onSubmit}>
        <h3 className={h3_type}>Регистрация</h3>
        <Input
          onChange={handleChange}
          icon={'EditIcon'}
          type={'text'}
          placeholder={'Имя'}
          value={values.name}
          name={'name'}
          size={'default'}
          extraClass="mt-6"
        />
        <EmailInput
          onChange={handleChange}
          isIcon={true}
          value={values.email}
          name={'email'}
          extraClass="mt-6"
        />
        <PasswordInput
          onChange={handleChange}
          icon={'EditIcon'}
          value={values.password}
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
