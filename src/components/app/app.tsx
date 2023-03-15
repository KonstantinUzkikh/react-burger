import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { useDispatch } from '../../store/hooks';
import { getIngredientsThunk } from '../../store/thunks';
import AppHeader from '../app-header/app-header';
import ProtectedRoute from '../protected-route/protected-route';
import ModalLoader from '../modal-loader/modal-loader';
import Notifier from '../notifier/notifier';
import HomePage from '../../pages/home';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import ProfilePage from '../../pages/profile';
import IngredientPage from '../../pages/ingredient';
import NotFoundPage from '../../pages/not-found';
import ModalIngredientPage from '../../pages/modal-ingredient';
import FeedPage from '../../pages/feed';
import OrderPage from '../../pages/order';
import ModalOrderPage from '../../pages/modal-order';

function App() {

  const dispatch = useDispatch();

  useEffect(() => dispatch(getIngredientsThunk()));

  const location = useLocation();
  const state = location.state;

  return (
    <>
      <AppHeader />
      <Routes location={state?.backgroundLocation || location}>
        <Route index path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProtectedRoute children={<ProfilePage />} />} />
        <Route path="/profile/orders" element={<ProtectedRoute children={<ProfilePage />} />} />
        <Route path="/profile/orders/:id" element={<ProtectedRoute children={<OrderPage /> } />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="/feed" element={<FeedPage /> } />
        <Route path="/feed/:id" element={<OrderPage /> } />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={<ModalIngredientPage />} />
          <Route path="/feed/:id" element={<ModalOrderPage /> } />
          <Route path="/profile/orders/:id" element={<ModalOrderPage /> } />
        </Routes>
      )}

      <ModalLoader />
      <Notifier />
    </>
  );
}

export default App;
