import React from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import img1 from'../Img/american_futbol.jpg'

const Card1 = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <Card key={index} style={{ width: '18rem', margin: '10px' }}>
          <img alt="Sample" src= {img1}/>
          <CardBody>
            <CardTitle tag="h5">Partido {item.partido}</CardTitle>
            <CardText>Lugar: {item.lugar}</CardText>
            <CardText>Fecha: {item.fecha}</CardText>
            <CardText>Hora: {item.hora}</CardText>
            <Button color='primary' href="/" tag="a">Ver más</Button>
          </CardBody>
        </Card>
      ))}
    </>
  );
};

export default Card1;
