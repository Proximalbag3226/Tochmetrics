import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  console.log('Usuario:', usuario);

  if (!usuario || !usuario.tipo) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute