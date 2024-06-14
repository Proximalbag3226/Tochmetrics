/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Alert } from 'reactstrap';
import axios from 'axios';
import { Card2 } from '../components/card';
import { ShowDescription } from '../components/card';
import ModalForm from '../components/modal_form';
import '../components/cards.css'

const fields = [
  { name: "nombre_liga", type: "text" },
  { name: "fecha_creacion", type: "date" },
  { name: "descripcion", type: "textarea" },
  { name: "imagen", type: "file" },
  {name: "documento", type: "file" }
];

function Ligas() {
  const user = JSON.parse(localStorage.getItem('usuario'));
  const isHeadReferee = user && user.tipo === 'head_referee';
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalVerMas, setModalVerMas] = useState(false);
  const [form, setForm] = useState({ nombre_liga: "", fecha_creacion: "", descripcion: "", imagen: null, documento: null });
  const [currentData, setCurrentData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/ligas/obtener_ligas');
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
    const { name, value, files } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value
    }));
  };

  const insertar = async () => {
    const formData = new FormData();
    formData.append("nombre_liga", form.nombre_liga);
    formData.append("fecha_creacion", form.fecha_creacion);
    formData.append("descripcion", form.descripcion);
    formData.append("imagen", form.imagen);
    formData.append("documento", form.documento)

    try {
      const response = await axios.post('http://localhost:8000/ligas/agregar_liga', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setData([...data, response.data]);
      setModalInsertar(false);
      setForm({ nombre_liga: "", fecha_creacion: "", descripcion: "", imagen: null, documento: null});
    } catch (error) {
      console.error('Error inserting data: ', error);
    }
  };

  return (
    <Container className='conteiner'>
      <h1 className='titulo'>Ligas</h1>
      <br/>
      {isHeadReferee && (
      <Button color="success" onClick={mostrarModalInsertar}>Crear</Button>
      )}
      <div className='container d-flex justify-content-center h-100 align-items-center'>
        <div className="row">
          {Array.isArray(data) && data.length>0 ? (
            data.map((item, index) => (
            <div className="col-md-4" key={index}>
              <Card2 data={item} img={`http://127.0.0.1:8000/imagenes/${item.imagen}`} click={() => mostrarModalVerMas(item)} />
            </div>
          ))
          ) : (
            <Alert color="danger">
            <p>Aun no hay ligas registradas</p>
          </Alert>
          )}
        </div>
      </div>
      <ModalForm
        isOpen={modalInsertar}
        title="Nueva liga"
        fields={fields}
        formData={{ ...form }}
        onChange={handleChange}
        onSave={insertar}
        onClose={cerrarModalInsertar}
      />
      <ShowDescription
        isOpen={modalVerMas}
        title={`Liga: ${currentData.nombre_liga}`}
        data={currentData}
        onClose={cerrarModalVerMas}
      />
    </Container>
  );
}

export default Ligas;