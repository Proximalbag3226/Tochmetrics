import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';

const ReportesRecientes = () => {
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/reportes/obtener_reportes');
        setReportes(response.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching reportes:', error);
      }
    };

    fetchReportes();
  }, []);

  if (reportes.length === 0) {
    return <p>No hay reportes disponibles</p>;
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
        {reportes.map((reporte, index) => (
          <tr key={index}>
            <th scope="row">{reporte.num_partido}</th>
            <td>{reporte.lugar}</td>
            <td>{reporte.fecha}</td>
            <td>{reporte.equipos}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ReportesRecientes;
