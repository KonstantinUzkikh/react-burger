import React from 'react';
import { Navigate } from 'react-router-dom';

import { readUserData } from '../../utils/cookies';

function ProtectedRoute({ element }) {

  const { email } = readUserData();

  return email !== undefined ? element : <Navigate to="/login" replace/>;
}

export default ProtectedRoute;
