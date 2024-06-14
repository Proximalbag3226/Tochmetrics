import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, ListGroup, ListGroupItem, Alert } from 'reactstrap';
import '../components/cards.css'

const Reglas = () => {
  const [ligas, setLigas] = useState([]);

  useEffect(() => {
    const fetchLigas = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/ligas/obtener_ligas');
        setLigas(response.data);
      } catch (error) {
        console.error('Error fetching ligas:', error);
      }
    };

    fetchLigas();
  }, []);

  const handleDownload = (documento) => {
    if (documento) {
      window.location.href = `http://127.0.0.1:8000/documentos/${documento}`;
    } else {
      alert('No hay documento disponible para esta liga.');
    }
  };

  return (
    <Container className='conteiner'>
      <h1 className='titulo'>Reglas de las Ligas</h1>
      <br/>
      {ligas.length === 0 ? (
        <Alert color="danger">No se encuentran reglamentos disponibles</Alert>
      ) : (
        <ListGroup>
          {ligas.map((liga, index) => (
            <ListGroupItem key={index} className="d-flex justify-content-between align-items-center">
              {liga.nombre_liga}
              <Button color="primary" onClick={() => handleDownload(liga.documento)}>
                Descargar
              </Button>
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default Reglas;
