import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'reactstrap';
import Card1 from './card';
import ModalForm from './modal_form';

const initialData = [
  { partido: 1, lugar: 'CDMX', fecha: 'Hoy', hora: '10:00' }
];

const fields = [
  { name: "partido", type: "text" },
  { name: "lugar", type: "text" },
  { name: "fecha", type: "date" },
  { name: "hora", type: "text" },
];

function Cards() {
  const [data, setData] = useState(initialData);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [form, setForm] = useState({ partido: "", lugar: "", fecha: "", hora: "" });

  const mostrarModalInsertar = () => setModalInsertar(true);

  const cerrarModalInsertar = () => setModalInsertar(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const insertar = () => {
    const nuevoPartido = { ...form, partido: data.length + 1 };
    setData([...data, nuevoPartido]);
    setModalInsertar(false);
  };

  return (
    <Container>
      <Button color="success" onClick={mostrarModalInsertar}>Crear</Button>
      <div className='container d-flex justify-content-center h-100 align-items-center'>
        <div className="row">
          <Card1 data={data} />
        </div>
      </div>
      <ModalForm
        isOpen={modalInsertar}
        title="Nuevo partido"
        fields={fields}
        formData={{ ...form, partido: data.length + 1 }}
        onChange={handleChange}
        onSave={insertar}
        onClose={cerrarModalInsertar}
      />
    </Container>
  );
}

export default Cards;
