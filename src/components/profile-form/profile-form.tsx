import { useState, useEffect, FC, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector, useDispatch } from '../../store/hooks';
import { getReadProfileThunk, getUpdateProfileThunk } from '../../store/thunks';
import { useForm } from '../../hooks/useForm';
import profileLayout from './profile-form.module.css'

const ProfileForm: FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoadProfile, name, email, password } = useSelector(state => state.profile);
  const { values, handleChange, setValues } = useForm({ name: '', email: '', password: '' });
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [initUser, setInitUser] = useState({});

  useEffect(() => {
    if (!isLoadProfile && isFirstRender) dispatch(getReadProfileThunk(() => navigate('/login')));
    if (isLoadProfile) {
      setValues({ name, email, password });
      setInitUser({ name, email, password });
      setIsFirstRender(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadProfile]);

  const [isChanged, setIsChanged] = useState(false); // ДОРАБОТАТЬ ЛОГИКУ

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange(event);
    setIsChanged(true);
  }

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(getUpdateProfileThunk(values, () => navigate('/login')));
  }

  const onReset = (evt: FormEvent) => {
    evt.preventDefault();
    setValues(initUser);
    setIsChanged(false);
  }

  const typeButton = isChanged ? "primary" : "secondary"; // ДОРАБОТАТЬ ЛОГИКУ

  return (
    <>
      {isLoadProfile &&
        <form className={profileLayout.boxForm} onSubmit={onSubmit} onReset={onReset}>
          <Input
            onChange={onChange}
            icon={'EditIcon'}
            type={'text'}
            placeholder={'Имя'}
            value={values.name}
            name={'name'}
            size={'default'}
            extraClass="mt-6"
          />
          <EmailInput
            onChange={onChange}
            isIcon={true}
            value={values.email}
            name={'email'}
            extraClass="mt-6"
          />
          <PasswordInput
            onChange={onChange}
            icon={'EditIcon'}
            value={values.password}
            name={'password'}
            extraClass="mt-6"
          />
          <div className={profileLayout.boxButtons}>
            <div className={profileLayout.button}>
              <Button htmlType="reset" type={typeButton} size="medium">
                Отмена
              </Button>
            </div>
            <div className={profileLayout.button}>
              <Button htmlType="submit" type={typeButton} size="medium">
                Сохранить
              </Button>
            </div>
          </div>
        </form>
      }
    </>
  )
}

export default ProfileForm
