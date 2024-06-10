import { useNavigate } from 'react-router-dom';

const UnauthenticatedOnlyRoute = ({ children }) => {
  const navigate = useNavigate();
  const storedUsuario = localStorage.getItem('usuario');
  if (storedUsuario) {
    return navigate("/")
  }

  return children;
};

export default UnauthenticatedOnlyRoute