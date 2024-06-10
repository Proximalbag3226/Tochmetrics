import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'reactstrap';
import axios from 'axios';
import Card1 from '../components/card';
import ModalForm from '../components/modal_form';

const fields = [
    { name: "nombre_liga", type: "text" },
    { name: "fecha_creacion", type: "date" },
    { name: "descripcion", type: "text" },
    { name: "imagen", type: "file" }
];

function Ligas() {
  const user = JSON.parse(localStorage.getItem('usuario'));
  const isRegularReferee = user && user.tipo === 'regular_referee';
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalVerMas, setModalVerMas] = useState(false);
  const [form, setForm] = useState({ nombre_liga: "", fecha_creacion: "", descripcion: "", imagen: null });
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

    try {
      const response = await axios.post('http://127.0.0.1:8000/estadisticas/agregar_estadistica', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setData([...data, response.data]);
      setModalInsertar(false);
      setForm({ nombre_liga: "", fecha_creacion: "", descripcion: "", imagen: null });
    } catch (error) {
      console.error('Error inserting data: ', error);
    }
  };

  return (
    <Container>
      {isRegularReferee && (
        <Button color="success" onClick={mostrarModalInsertar}>Crear</Button>
      )}
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
        title="Nueva liga"
        fields={fields}
        formData={{ ...form }}
        onChange={handleChange}
        onSave={insertar}
        onClose={cerrarModalInsertar}
      />
    </Container>
  );
}

export default Ligas;
