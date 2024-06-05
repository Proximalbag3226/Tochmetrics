import { Navigate } from 'react-router-dom';


const AuthRoute = ({ children }) => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log('AuthRoute Usuario:', usuario);
  
    if (usuario && usuario.tipo) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  };
export default AuthRoute;
