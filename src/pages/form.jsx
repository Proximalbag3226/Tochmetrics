import React, { useState } from 'react';
import axios from 'axios';

const RegisterEmployee = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    puesto: '',
    salario: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (formData.nombre.length < 5 || formData.nombre.length > 25) {
      newErrors.nombre = 'El nombre debe tener entre 5 y 25 caracteres.';
    }

    if (formData.edad < 18 || formData.edad > 70) {
      newErrors.edad = 'La edad debe ser entre 18 y 70 años.';
    }

    if (formData.salario < 7468 || formData.salario > 40000) {
      newErrors.salario = 'El salario debe estar entre 7468 y 40000.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/empleados/agregar_empleado', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      alert('Empleado registrado con éxito');
    } catch (error) {
      console.error('Error registrando empleado:', error);
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
          />
          {errors.salario && <p>{errors.salario}</p>}
        </label>
      </div>
      <button type="submit">Registrar Empleado</button>
    </form>
  );
};

export default RegisterEmployee;
