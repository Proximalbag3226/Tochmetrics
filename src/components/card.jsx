import React from 'react';
import { Card, CardBody, CardTitle, CardText, Button, Container } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import axios from 'axios';

function Card1({ data, img, click}) {
  return (
    <Card style={{ width: '18rem' }}>
      <img alt="Sample" src={img} />
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

export function Card2({ data, img, click}) {
  return (
    <Card style={{ width: '18rem' }}>
      <img alt="Sample" src={img} />
      <CardBody>
        <CardTitle tag="h5">{`Liga: ${data.nombre_liga}`}</CardTitle>
        <CardText>{`Fecha de creacion: ${data.fecha_creacion}`}</CardText>
        <Button color='primary' onClick={click}>Ver más</Button>
      </CardBody>
    </Card>
  );
};

export const ShowDescription = ({ isOpen, title, data, onClose }) => {
  const handleDownloadDocument = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/documentos/${data.documento}`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', data.documento);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error al descargar documento:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={onClose}>
      <ModalHeader toggle={onClose}>{title}</ModalHeader>
      <ModalBody className='modal-body-container'>
        <p>{data.descripcion}</p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose}>Cerrar</Button>
        {data.documento && (
          <Button color="primary" onClick={handleDownloadDocument}>Descargar reglamento</Button>
        )}
      </ModalFooter>
    </Modal>
  );
};
