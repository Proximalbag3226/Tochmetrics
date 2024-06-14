import React from 'react';
import { Container, Row, Col, Button, Card, CardBody, CardTitle } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import * as BsIcons from "react-icons/bs";
import EstadisticasRecientes from '../components/estadisticas_r';
import ReportesRecientes from '../components/reportes_r';
import { useState, useEffect } from 'react';
import '../components/cards.css'


function Home() {
  const user = JSON.parse(localStorage.getItem('usuario'));
  const isReferee = user && (user.tipo === 'head_referee' || user.tipo === 'regular_referee');
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');

  useEffect(() => {
      const storedUsuario = localStorage.getItem('usuario');
      if (storedUsuario) {
          const usuarioObjeto = JSON.parse(storedUsuario);
          setUsuario(usuarioObjeto.usuario || usuarioObjeto);
      } else {
          navigate('/login'); 
      }
  }, [navigate]);

  return (
    <Container className='conteiner'>
      <h1 className='titulo'>Bienvenid@ {usuario}</h1>
      <br/>
      <Row>
        <Col md={6}>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Estadísticas Recientes</CardTitle>
              <EstadisticasRecientes />
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Reportes Recientes</CardTitle>
              <ReportesRecientes />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br/>
      {isReferee && (
        <Row>
          <Col md={6}>
            <Button color="success" onClick={() => navigate('/partidos')}>
              <BsIcons.BsPlusCircleFill /> Agregar partido
            </Button>
          </Col>
          <Col md={6}>
            <Button color="primary" onClick={() => navigate('/reportes')}>
              <BsIcons.BsPlusCircleFill /> Crear nuevo reporte
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Home;
