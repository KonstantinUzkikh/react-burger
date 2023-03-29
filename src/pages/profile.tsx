import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import ProfileForm from '../components/profile-form/profile-form';
import ProfileHistory from '../components/profile-history/profile-history';
import { useDispatch } from '../store/hooks-store';
import { getLogoutThunk } from '../store/thunks';
import { h3_type, letters_grey } from '../utils';
import profileLayout from './profile.module.css'

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

  const onProfile = () => navigate('/profile');
  const onHistory = () => navigate('/profile/orders');
  const onLogout = () => dispatch(getLogoutThunk(() => navigate('/')));

  return (
    <>
      <div className={profileLayout.boxPage}>
        <div className={profileLayout.boxProfile}>
          <div>
            <nav>
              <ul className={profileLayout.ul}>
                <li onClick={onProfile}><ListItem title='Профиль' isActive={pathname === '/profile'} /></li>
                <li onClick={onHistory}><ListItem title='История заказов' isActive={pathname === '/profile/orders'} /></li>
                <li onClick={onLogout} id='logout' ><ListItem title='Выход' isActive={pathname === '/logout'} /></li>
              </ul>
            </nav>
            <span className={`${profileLayout.span} ${letters_grey}`} >
              В этом разделе вы можете<br />изменить свои персональные данные
            </span>
          </div>
          {pathname === '/profile' && <ProfileForm />}
          {pathname === '/profile/orders' && <ProfileHistory />}
        </div>
      </div>
    </>
  )
}

export default ProfilePage
