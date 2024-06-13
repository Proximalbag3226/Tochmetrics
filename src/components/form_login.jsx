import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import './form.css'

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const errors = {};
        if (!username) {
            errors.username = 'El usuario es obligatorio';
        }
        if (!password) {
            errors.password = 'La contraseña es obligatoria';
        }
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/usuarios/login_usuario', {
                usuario: username,
                contraseña: password
            });
            alert(response.data.message);
            console.log(response.data);

            const usuario = response.data.usuario;
            localStorage.setItem('usuario', JSON.stringify(usuario));

            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Usuario o contraseña incorrectos.');
            } else {
                setError('Ha sucedido un error, intente más tarde por favor.');
            }
        }
    };

    return (
        <Form onSubmit={handleLogin} className='login'>
            <h2>Inicio de Sesión</h2>
            <br/>
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <Label>Usuario</Label>
                        <Input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            invalid={!!fieldErrors.username}
                        />
                        {fieldErrors.username && <FormFeedback>{fieldErrors.username}</FormFeedback>}
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label>Contraseña</Label>
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            invalid={!!fieldErrors.password}
                        />
                        {fieldErrors.password && <FormFeedback>{fieldErrors.password}</FormFeedback>}
                    </FormGroup>
                </Col>
            </Row>
            <Button color="success" type="submit">Login</Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </Form>
    );
};

export default LoginForm;
