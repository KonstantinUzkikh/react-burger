import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import { Input, EmailInput, PasswordInput, Button, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import { sendRequest, getSuccess, getFaild } from '../services/actions/api';
import { readUserData, readPassword } from '../utils/cookies';
import profileLayout from './profile.module.css'
import { h3_type, letters_grey } from '../utils/types.js';
import { getReadProfile, getUpdateProfile, getLogout } from '../services/get-data';
import { useForm } from '../hooks/useForm';

const ListItem = ({ title, isActive }) => {
  let style = `${profileLayout.navItem} ${h3_type}`;
  if (!isActive) { style = `${style} ${profileLayout.grey}` };
  return (
    <>
      <h3 className={style} type="button">{title}</h3>
    </>
  )
}

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired
};

function ProfilePage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {values, handleChange, setValues } = useForm({name: '', email: '', password: ''});

  useEffect(() => {
    async function loadUserData() {
      dispatch(sendRequest('profile'));
      const res = await getReadProfile(undefined, () => navigate('/login'));
      try {
        const {name, email, password} = res;
        setValues({name, email, password});
        dispatch(getSuccess());
      }
      catch (err) {
        dispatch(getFaild(err))
      }
    }
    loadUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const [isChanged, setIsChanged] = useState(false); // ДОРАБОТАТЬ ЛОГИКУ

  const onChange = (e) => {
    handleChange(e);
    setIsChanged(true);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getUpdateProfile(values, () => navigate('/login')));
  }

  const onReset = (e) => {
    e.preventDefault();
    const { name, email } = readUserData();
    const password = readPassword();
    setValues({name, email, password});
    setIsChanged(false);
  }

  const onProfile = () => navigate('/profile');
  const onHistory = () => navigate('/history');
  const onLogout = () => dispatch(getLogout(() => navigate('/')));

  const typeButton = isChanged ? "primary" : "secondary"; // ДОРАБОТАТЬ ЛОГИКУ

  return (
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
            icon={'EditIcon'}
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
    </div>
  )
}

export default ProfilePage
