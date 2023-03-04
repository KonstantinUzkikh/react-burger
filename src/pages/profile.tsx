import { useState, useEffect, FC, FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import profileLayout from './profile.module.css'
import { h3_type, letters_grey } from '../utils/types';
import { getReadProfileNew, getUpdateProfile, getLogout } from '../services/get-data';
import { useForm } from '../hooks/useForm';

const ListItem: FC<{ title: string; isActive: boolean }> = ({ title, isActive }) => {
  let style = `${profileLayout.navItem} ${h3_type}`;
  if (!isActive) { style = `${style} ${profileLayout.grey}` };
  return (
    <>
      <h3 className={style}>{title}</h3>
    </>
  )
}

const ProfilePage: FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { isLoadProfile, name, email, password }: any = useSelector<any>(state => state.profile);
  const { values, handleChange, setValues } = useForm({ name: '', email: '', password: '' });
  const [isFirstMount, setIsFirstMount] = useState(true);
  const [initUser, setInitUser] = useState({});

  useEffect(() => {
    if (!isLoadProfile && isFirstMount) dispatch<any>(getReadProfileNew(() => navigate('/login')));
    if (isLoadProfile) {
      setValues({ name, email, password });
      setInitUser({ name, email, password });
      setIsFirstMount(false);
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
    dispatch<any>(getUpdateProfile(values, () => navigate('/login')));
  }

  const onReset = (evt: FormEvent) => {
    evt.preventDefault();
    setValues(initUser);
    setIsChanged(false);
  }

  const onProfile = () => navigate('/profile');
  const onHistory = () => navigate('/history');
  const onLogout = () => dispatch<any>(getLogout(() => navigate('/')));

  const typeButton = isChanged ? "primary" : "secondary"; // ДОРАБОТАТЬ ЛОГИКУ

  return (
    <>
      {isLoadProfile &&
        <div className={profileLayout.boxPage}>
          <div className={profileLayout.boxProfile}>
            <div>
              <nav>
                <ul className={profileLayout.ul}>
                  <li onClick={onProfile}><ListItem title='Профиль' isActive={pathname === '/profile'} /></li>
                  <li onClick={onHistory}><ListItem title='История заказов' isActive={pathname === '/history'} /></li>
                  <li onClick={onLogout}><ListItem title='Выход' isActive={pathname === '/logout'} /></li>
                </ul>
              </nav>
              <span className={`${profileLayout.span} ${letters_grey}`}>В этом разделе вы можете<br />изменить свои персональные данные</span>
            </div>
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
          </div>
        </div>}
    </>
  )
}

export default ProfilePage
