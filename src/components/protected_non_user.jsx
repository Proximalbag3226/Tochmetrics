import React from 'react';
import { Link } from 'react-router-dom';

const NotAuthenticated = () => {
    return (
        <div>
            <h2>Acceso Restringido</h2>
            <p>Necesitas estar autenticado para acceder a esta página.</p>
            <Link to="/login">Iniciar Sesión</Link> | <Link to="/register">Registrarse</Link>
        </div>
    );
};

export default NotAuthenticated;
