import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

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
        <Form onSubmit={handleLogin}>
            <h2>Inicio de Sesión</h2>
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <Label>Usuario</Label>
                        <Input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
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
                            required
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Button color="success" type="submit">Login</Button>
            {error && <p>{error}</p>}
        </Form>
    );
};

export default LoginForm;
