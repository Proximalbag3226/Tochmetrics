import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'reactstrap';
import Card1 from './card';
import ModalForm from './modal_form';
import { ModalshowComponent } from './modal_form';

const initialData = [
  { partido: 1, lugar: 'CDMX', fecha: 'Hoy', hora: '10:00', anot: 30, ob: 5, sack: 10, inter: 25, pex: 13, panot: 15 }
];

const fields = [
  { name: "partido", type: "text" },
  { name: "lugar", type: "text" },
  { name: "fecha", type: "date" },
  { name: "hora", type: "text" },
  { name: "anot", type: "text" },
  { name: "ob", type: "text" },
  { name: "sack", type: "text" },
  { name: "inter", type: "text" },
  { name: "pex", type: "text" },
  { name: "panot", type: "text" }
];

const graphicData = (item) => ({
  labels: ["Anot", "Ob", "Sack", "Inter", "P.ex", "P.anot"],
  datasets: [
    {
      label: "Primera mitad",
      data: [item.anot, item.ob, item.sack, item.inter, item.pex, item.panot],
      backgroundColor: [
        "rgba(190, 52, 127)",
        "rgba(190, 52, 58)",
        "rgba(190, 115, 52)",
        "rgba(190, 184, 52)",
        "rgba(127, 190, 52)"
      ],
      hoverOffset: 4
    }
  ]
});

function Cards() {
  const [data, setData] = useState(initialData);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalVerMas, setModalVerMas] = useState(false);
  const [form, setForm] = useState({ partido: "", lugar: "", fecha: "", hora: "", anot: "", ob: "", sack: "", inter: "", pex: "", panot: "" });
  const [currentData, setCurrentData] = useState({});

  const mostrarModalInsertar = () => setModalInsertar(true);

  const cerrarModalInsertar = () => setModalInsertar(false);

  const mostrarModalVerMas = (item) => {
    setCurrentData(item);
    setModalVerMas(true);
  };

  const cerrarModalVerMas = () => setModalVerMas(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const insertar = () => {
    const nuevoPartido = { ...form, partido: data.length + 1 };
    setData([...data, nuevoPartido]);
    setModalInsertar(false);
    setForm({ partido: "", lugar: "", fecha: "", hora: "", anot: "", ob: "", sack: "", inter: "", pex: "", panot: "" }); // Reset form after insertion
  };

  return (
    <Container>
      <Button color="success" onClick={mostrarModalInsertar}>Crear</Button>
      <div className='container d-flex justify-content-center h-100 align-items-center'>
        <div className="row">
          {Array.isArray(data) && data.map((item, index) => (
            <div className="col-md-4" key={index}>
              <Card1 data={item} click={() => mostrarModalVerMas(item)} />
            </div>
          ))}
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
      <ModalshowComponent
        isOpen={modalVerMas}
        title={"Grafico primera mitad"}
        graphData={graphicData(currentData)}
        onClose={cerrarModalVerMas}
      />
    </Container>
  );
}

export default Cards;
