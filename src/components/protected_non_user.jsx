import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, Container } from 'reactstrap';
import './form.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const NotAuthenticated = () => {
    return (
        <Container className='login'>
            <Alert color='danger'>
            <h4 className='alert-heading'>Acceso Restringido</h4>
            <p>Necesitas estar autenticado para acceder a esta página.</p>
            <hr/>
            <Link to="/login" className='alert-link'>Iniciar Sesión</Link> | <Link to="/register" className='alert-link'>Registrarse</Link>
            </Alert>
        </Container>
    );
};

export default NotAuthenticated;
