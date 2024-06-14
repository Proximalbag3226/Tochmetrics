import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Alert } from 'reactstrap';
import axios from 'axios';
import Card1 from './card';
import ModalForm from './modal_form';
import { ModalshowComponent } from './modal_form';
import ola from '../Img/campo_americano2.jpg';

const fields = [
  { name: "num_partido", type: "text", readOnly: true },
  { name: "lugar", type: "text" },
  { name: "fecha", type: "date" },
  { name: "hora", type: "time" },
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
  const user = JSON.parse(localStorage.getItem('usuario'));
  const isRegularReferee = user && user.tipo === 'regular_referee';
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalVerMas, setModalVerMas] = useState(false);
  const [form, setForm] = useState({ lugar: "", fecha: "", hora: "", anot: "", ob: "", sack: "", inter: "", pex: "", panot: "" });
  const [currentData, setCurrentData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/estadisticas/obtener_estadisticas'); 
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

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

  const insertar = async () => {
    const nuevaEstadistica = { ...form, num_partido: data.length + 1 };
    try {
      const response = await axios.post('http://127.0.0.1:8000/estadisticas/agregar_estadistica', nuevaEstadistica); 
      setData([...data, response.data]);
      setModalInsertar(false);
      setForm({ lugar: "", fecha: "", hora: "", anot: "", ob: "", sack: "", inter: "", pex: "", panot: "" });
    } catch (error) {
      console.error('Error inserting data: ', error);
    }
  };

  return (
    <Container className='container'>
      <h1 className='titulo'>Estadísticas</h1>
      {isRegularReferee && (
        <Button color="success" onClick={mostrarModalInsertar}>Crear</Button>
      )}
      <div className='container d-flex justify-content-center h-100 align-items-center'>
        <div className="row">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item, index) => (
              <div className="col-md-4" key={index}>
                <Card1 data={item} img={ola} click={() => mostrarModalVerMas(item)} />
              </div>
            ))
          ) : (
            <Alert color="danger">
              <p>No hay estadísticas disponibles</p>
            </Alert>
          )}
        </div>
      </div>
      <ModalForm
        isOpen={modalInsertar}
        title="Nuevo partido"
        fields={fields}
        formData={{ ...form, num_partido: data.length + 1 }}
        onChange={handleChange}
        onSave={insertar}
        onClose={cerrarModalInsertar}
      />
      <ModalshowComponent
        isOpen={modalVerMas}
        title={"Gráfico primera mitad"}
        graphData={graphicData(currentData)}
        onClose={cerrarModalVerMas}
      />
    </Container>
  );
}

export default Cards;
