import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
import NotFound from '../../pages/not-found';

function App() {

  const dispatch = useDispatch();

  useEffect(() => { dispatch(getIngredients()) }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
          <Route path="/ingredients/:id" element={<IngredientPage />} />
          <Route path="/orders" element={null} />
          <Route path="/orders/:id" element={null} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ModalLoader />
      <Notifier />
    </>
  );
}

export default App;
