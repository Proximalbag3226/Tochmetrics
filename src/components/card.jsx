import React from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import img1 from'../Img/american_futbol.jpg'

function Card1({ data, click }) {
  return (
    <Card style={{ width: '18rem' }}>
      <img alt="Sample" src={img1} />
      <CardBody>
        <CardTitle tag="h5">{`Partido ${data.partido}`}</CardTitle>
        <CardText>{`Lugar: ${data.lugar}`}</CardText>
        <CardText>{`Fecha: ${data.fecha}`}</CardText>
        <CardText>{`Hora: ${data.hora}`}</CardText>
        <Button color='primary' onClick={click}>Ver más</Button>
      </CardBody>
    </Card>
  );
};

export default Card1;
