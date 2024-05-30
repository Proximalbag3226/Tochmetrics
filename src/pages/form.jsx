import React, { useState } from 'react';
import axios from 'axios';

const validateForm = (formData) => {
  const errors = {};

  if (formData.nombre.length < 5 || formData.nombre.length > 25) {
    errors.nombre = 'El nombre debe tener entre 5 y 25 caracteres.';
  }

  if (formData.usuario.length < 5 || formData.usuario.length > 25) {
    errors.usuario = 'El usuario no debe de tener mas de 25 o menos de 5 caracteres.';
  }

  if(formData.contraseña.length < 8 || formData.contraseña.length > 15) {
    errors.contraseña = 'La contraseña debe tener mas de 8 caracteres y no mas de 15';
  }

  if (formData.apellidos.length < 5 || formData.apellidos.length > 35){
    errors.apellidos = 'Los apellidos deben tener entre 5 y 35 caracteres';
  }

  if (formData.correo.length < 10 || formData.correo.length > 30) {
    errors.salario = 'El correo solo puede tener entre 10 y 30 caracteres';
  }

  return errors;
};

const RegisterEmployee = () => {
  const [formData, setFormData] = useState({
    usuario: '',
    contraseña: '',
    nombre: '',
    apellidos: '',
    correo: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [nombreRespuesta, setNombreRespuesta] = useState(null);
  const [responseData, setResponseData] = useState(null);

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
    setNombreRespuesta(null);
    setResponseData(null);

    try {
      const response = await axios.post('http://127.0.0.1:8000/empleados/agregar_empleado', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      const empleado = response.data[0]; // Acceder al primer elemento del array
      setMessage('Empleado registrado con éxito');
      setNombreRespuesta(empleado.nombre); // Guarda solo el nombre de la respuesta del servidor
      setResponseData(empleado); // Guarda toda la respuesta del servidor
    } catch (error) {
      console.error('Error registrando empleado:', error);
      setMessage('Error registrando empleado');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Usuario:
          <input
            type="text"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            min={5}
            max={25}
            required
          />
          {errors.usuario && <p>{errors.usuario}</p>}
        </label>
      </div>
      <div>
        <label>
          Contraseña:
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            min={8}
            max={15}
            required
          />
          {errors.contraseña && <p>{errors.contraseña}</p>}
        </label>
      </div>
      <div>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            minLength={5}
            maxLength={25}
            required
          />
          {errors.nombre && <p>{errors.nombre}</p>}
        </label>
      </div>
      <div>
        <label>
          Apellidos:
          <input
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            min={5}
            max={35}
            required
          />
          {errors.apellidos && <p>{errors.apellidos}</p>}
        </label>
      </div>
      <div>
        <label>
          Correo:
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button type="submit" disabled={isSubmitting}>Registrar Usuario</button>
      {message && <p>{message}</p>}
      {nombreRespuesta && (
        <div>
          <h3>Nombre recibido del servidor:</h3>
          <p>{nombreRespuesta}</p>
        </div>
      )}
      {responseData && (
        <div>
          <h3>Datos completos del servidor:</h3>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </form>
  );
};

export default RegisterEmployee;
