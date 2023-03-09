import { FC, FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch } from '../store/hooks';
import pageLayout from './page.module.css'
import { h3_type, letters_grey, letters } from '../utils/types';
import { checkLogin } from '../utils/utils';
import { getForgotPasswordThunk } from '../store/thunks/forgot-password';
import { useForm } from '../hooks/useForm';

const ForgotPasswordPage: FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {values, handleChange } = useForm({email: ''});

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(getForgotPasswordThunk(values, () => navigate('/reset-password')));
  }

  const onLogin = () => navigate('/login');

  if (checkLogin()) {
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
          isIcon={true}
          value={values.email}
          name={'email'}
          extraClass="mt-6"
        />
        <div className={pageLayout.buttonSubmit}>
          <Button htmlType="submit" size="medium">
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
