import React, { useState, useEffect } from "react";
import { Container, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody, Alert } from "reactstrap";
import axios from "axios";
import '../components/cards.css'


function Torneos() {
  const [data, setData] = useState([]);
  const [collapse, setCollapse] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/partidos/obtener_partido');
        setData(response.data);
      } catch (error) {
        console.error('Error obteniendo datos:', error);
      }
    };

    fetchData();
  }, []);

  const toggleCollapse = (torneo) => {
    setCollapse((prevState) => ({
      ...prevState,
      [torneo]: !prevState[torneo]
    }));
  };

  const torneos = data.reduce((acc, partido) => {
    if (!acc[partido.torneo]) {
      acc[partido.torneo] = [];
    }
    acc[partido.torneo].push(partido);
    return acc;
  }, {});

  return (
    <Container className="conteiner">
      <h1 className="titulo">Torneos</h1>
      <br />
      <br />
      {Object.keys(torneos).length === 0 ? (
        <Alert color="danger">No hay torneos disponibles</Alert>
      ) : (
        <UncontrolledAccordion defaultOpen="1">
          {Object.keys(torneos).map((torneo, index) => (
            <AccordionItem key={index}>
              <AccordionHeader targetId={`${index + 1}`}>
                {torneo}
              </AccordionHeader>
              <AccordionBody accordionId={`${index + 1}`}>
              <h2 className="partidos">Partidos: </h2>
                {torneos[torneo].map((partido, index) => (
                  <div key={index}>
                    <strong>ID:</strong> {partido.id} <br />
                    <strong>Campo:</strong> {partido.campo} <br />
                    <strong>Liga:</strong> {partido.liga} <br />
                    <br />
                  </div>
                ))}
              </AccordionBody>
            </AccordionItem>
          ))}
        </UncontrolledAccordion>
      )}
    </Container>
  );
};

export default Torneos;
