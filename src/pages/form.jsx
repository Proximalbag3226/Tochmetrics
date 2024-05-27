import React, { useState } from 'react';
import axios from 'axios';

const validateForm = (formData) => {
  const errors = {};

  if (formData.nombre.length < 5 || formData.nombre.length > 25) {
    errors.nombre = 'El nombre debe tener entre 5 y 25 caracteres.';
  }

  if (formData.edad < 18 || formData.edad > 70) {
    errors.edad = 'La edad debe ser entre 18 y 70 años.';
  }

  if (formData.salario < 7468 || formData.salario > 40000) {
    errors.salario = 'El salario debe estar entre 7468 y 40000.';
  }

  return errors;
};

const RegisterEmployee = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    puesto: '',
    salario: ''
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
      [name]: value.trim()
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
          Edad:
          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            min={18}
            max={70}
            required
          />
          {errors.edad && <p>{errors.edad}</p>}
        </label>
      </div>
      <div>
        <label>
          Puesto:
          <input
            type="text"
            name="puesto"
            value={formData.puesto}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Salario:
          <input
            type="number"
            name="salario"
            value={formData.salario}
            onChange={handleChange}
            min={7468}
            max={40000}
            required
          />
          {errors.salario && <p>{errors.salario}</p>}
        </label>
      </div>
      <button type="submit" disabled={isSubmitting}>Registrar Empleado</button>
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
