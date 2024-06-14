import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import DataTable from './date_table';
import './cards.css'


const fields = [
  { name: 'id', type: 'text', readOnly: true },
  { name: 'usuario', type: 'text' },
  { name: 'nombre', type: 'text' },
  { name: 'apellidos', type: 'text' },
  { name: 'correo', type: 'email' },
  {
    name: 'tipo',
    type: 'select',
    label: 'Tipo de Usuario',
    options: [
      { value: 'head_referee', label: 'Head Referee' },
      { value: 'regular_referee', label: 'Regular Referee' },
    ],
  },
];

const Tables = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/usuarios/obtener_usuarios');
        const sanitizedData = response.data.map(user => {
          const { contraseña, ...rest } = user;
          return rest;
        });
        setData(sanitizedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container className='conteiner'>
      <h1 className='titulo'>Usuarios</h1>
      <br />
      <DataTable data={data} fields={fields.map((field) => field.name)} />
    </Container>
  );
};

export default Tables;
