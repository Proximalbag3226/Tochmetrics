import React from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import ola from '../Img/campo_americano2.jpg'
function Card1({ data, click }) {
  var min = 1;
  var max = 4;

  var x = Math.floor(Math.random()*(max-min+1)+min);
  const imageSrc = `../Img/campo_americano${x}.jpg`

console.log(x);
  return (
    <Card style={{ width: '18rem' }}>
      <img alt="Sample" src={ola} />
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
