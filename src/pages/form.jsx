import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Form, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';

const validateForm = (formData) => {
  const errors = {};

  if (formData.nombre.length < 5 || formData.nombre.length > 25) {
    errors.nombre = 'El nombre debe tener entre 5 y 25 caracteres.';
  }

  if (formData.usuario.length < 5 || formData.usuario.length > 25) {
    errors.usuario = 'El usuario no debe de tener más de 25 o menos de 5 caracteres.';
  }

  if (formData.contraseña.length < 8 || formData.contraseña.length > 15) {
    errors.contraseña = 'La contraseña debe tener más de 8 caracteres y no más de 15';
  }

  if (formData.apellidos.length < 5 || formData.apellidos.length > 35) {
    errors.apellidos = 'Los apellidos deben tener entre 5 y 35 caracteres';
  }

  if (formData.correo.length < 10 || formData.correo.length > 30) {
    errors.correo = 'El correo solo puede tener entre 10 y 30 caracteres';
  }

  return errors;
};

const RegisterEmployee = () => {
  const [formData, setFormData] = useState({
    usuario: '',
    contraseña: '',
    nombre: '',
    apellidos: '',
    correo: '',
    tipo: 'head_referee' 
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/usuarios/agregar_usuario', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      const usuario = response.data; 
      setMessage('Usuario registrado con éxito');
      
      localStorage.setItem('usuario', JSON.stringify(usuario));
      
      navigate('/');
    } catch (error) {
      console.error('Error registrando usuario:', error);
      setMessage('Error registrando usuario');
      alert('Error registrando usuario');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label>Usuario:</Label>
            <Input
              type="text"
              placeholder="Juan123"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              min={5}
              max={25}
              required
            />
            {errors.usuario && <p>{errors.usuario}</p>}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Contraseña:</Label>
            <Input
              type="password"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              min={8}
              max={15}
              required
            />
            {errors.contraseña && <p>{errors.contraseña}</p>}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label>Nombre:</Label>
            <Input
              type="text"
              placeholder="Juan Jose"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              minLength={5}
              maxLength={25}
              required
            />
            {errors.nombre && <p>{errors.nombre}</p>}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Apellidos:</Label>
            <Input
              type="text"
              placeholder="Sanchez Perez"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              min={5}
              max={35}
              required
            />
            {errors.apellidos && <p>{errors.apellidos}</p>}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label>Correo:</Label>
            <Input
              type="email"
              placeholder="juan@gmail.com"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
            {errors.correo && <p>{errors.correo}</p>}
          </FormGroup>
        </Col>
      </Row>
      <br />
      <FormGroup>
        <Label>Tipo de usuario:</Label>
        <Input
          name="tipo"
          className="mb-3"
          type="select"
          value={formData.tipo}
          onChange={handleChange}
          required
        >
          <option key={'head_referee'} value={'head_referee'}>
            Head Referee
          </option>
          <option key={'regular_referee'} value={'regular_referee'}>
            Regular Referee
          </option>
        </Input>
      </FormGroup>
      <br />
      <Button color="success" type="submit" disabled={isSubmitting}>Registrar Usuario</Button>
      {message && <p>{message}</p>}
    </Form>
  );
};

export default RegisterEmployee;
