import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';

const EstadisticasRecientes = () => {
  const [estadisticas, setEstadisticas] = useState([]);

  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/estadisticas/obtener_estadisticas');
        setEstadisticas(response.data.slice(0, 5)); 
      } catch (error) {
        console.error('Error fetching estadisticas:', error);
      }
    };

    fetchEstadisticas();
  }, []);

  if (estadisticas.length === 0) {
    return <p>No hay estadísticas disponibles</p>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Lugar</th>
          <th>Fecha</th>
          <th>Equipos</th>
        </tr>
      </thead>
      <tbody>
        {estadisticas.map((stat, index) => (
          <tr key={index}>
            <th scope="row">{stat.num_partido}</th>
            <td>{stat.lugar}</td>
            <td>{stat.fecha}</td>
            <td>{stat.equipos}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default EstadisticasRecientes;
