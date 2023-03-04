import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';

import { getIngredients } from '../../services/get-data';
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

function App() {

  const dispatch = useDispatch();

  useEffect(() => dispatch<any>(getIngredients()), [dispatch]);

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
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="/orders" element={null} />
        <Route path="/orders/:id" element={null} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={<ModalIngredientPage />} />
        </Routes>
      )}

      <ModalLoader />
      <Notifier />
    </>
  );
}

export default App;
