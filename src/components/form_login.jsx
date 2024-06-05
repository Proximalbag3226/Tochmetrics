import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';


const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/usuarios/login_usuario', {
                usuario: username,
                contraseña: password
            });
            alert(response.data.message);
            console.log(response.data);
            const usuario = response.data;
            localStorage.setItem('usuario', JSON.stringify(usuario));

            navigate('/')
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Usuario o contraseña incorrectos.');
            } else {
                setError('Ah sucedido un error, intente mas tarde por favor.');
            }
        }
    };

    return (
        <Form>
            <h2>Inicio de Sesion</h2>
            <Row>
                <Col md={6}>
                    <FormGroup>
            <Label>Usuraio</Label>
            <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            </FormGroup>
            </Col>
            <Col md={6}>
                <FormGroup>
                    <Label>Contraseña:</Label>
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </FormGroup>
            </Col>
            </Row>
            <Button color="success" type="submit" onClick={handleLogin}>Login</Button>
            {error && <p>{error}</p>}
        </Form>
    );
};

export default LoginForm;
