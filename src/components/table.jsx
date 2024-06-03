import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'reactstrap';
import DataTable from './date_table';
import ModalForm from './modal_form';
import validateForm from '../functions/validator';

const fields = [
  { name: 'id', type: 'text', readOnly: true },
  { name: 'usuario', type: 'text',},
  { name: 'contraseña', type: 'password'},
  { name: 'nombre', type: 'text' },
  { name: 'apellidos', type: 'text'},
  { name: 'correo', type: 'email'},
  {
    name: 'tipo',
    type: 'select',
    label: 'tipo de usuario',
    options: [
      { value: 'head_referee', label: 'head referee' },
      { value: 'regular_referee', label: 'regular referee' },
    ],
  },
];

const Tables = () => {
  const [data, setData] = useState([]);
  const [modalActualizar, setModalActualizar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [form, setForm] = useState({usuario: "", contraseña: "", nombre: "", apeliidos:"", correo:"", tipo:""});
  const[errors, setErrors] = useState({})
  const[isSubmitting, setIsSubmitting] = useState(false)

  useEffect(()=> {
    const fetchData = async () =>{
    try{
      const response = await axios.get('http://127.0.0.1:8000/usuarios/obtener_usuarios')
      setData(response.data);
    }
    catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  fetchData();
}, []);

const handleChange = (e) => {
  const { name, value } = e.target;
  setForm((prevState) => ({ ...prevState, [name]: value }));
};

const handleSave = async () => {
  const validationErrors = validateForm(form, fields);
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) {
    return;
  }

  setIsSubmitting(true);

  try {
    if (modalActualizar) {
      await axios.put(`http://127.0.0.1:8000/usuarios/modificar_usuario/${form.id}`, form, {
        headers: {
          'Content-Type': 'application/json', 
        },
      });
      setData((prevState) => prevState.map((item) => (item.id === form.id ? form : item)));
    } else {
      const response = await axios.post('http://127.0.0.1:8000/usuarios/agregar_usuario', form, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setData([...data, response.data]);
    }
    setModalActualizar(false);
    setModalInsertar(false);
    setForm({usuario: "", contraseña: "", nombre: "", apeliidos:"", correo:"", tipo:""});
  } catch (error) {
    console.error('Error saving data:', error);
  } finally {
    setIsSubmitting(false);
  }
};

  const mostrarModalActualizar = (dato) => {
    setForm(dato);
    setModalActualizar(true);
  };


  const cerrarModalActualizar = () => setModalActualizar(false);

  const mostrarModalInsertar = () => setModalInsertar(true);

  const cerrarModalInsertar = () => setModalInsertar(false);

  const eliminar = async(dato) => {
    if (window.confirm(`Estás seguro que deseas eliminar el elemento ${dato.id}`)) {
      try{
        await axios.delete(`http://127.0.0.1:8000/usuarios/borrar_usuario/{id}?id_usuario=${dato.id}`);
        setData(data.filter((registro) => registro.id !== dato.id));
      } catch(error){
      console.error('Error deleting data: ', error)
    }
  };
  };

  return (
    <Container>
      <br />
      <Button color="success" onClick={mostrarModalInsertar}>Crear</Button>
      <br /><br />
      <DataTable data={data} fields={fields.map(field => field.name)} onEdit={mostrarModalActualizar} onDelete={eliminar} />
      
      <ModalForm
        isOpen={modalActualizar}
        title="Editar Registro"
        fields={fields}
        formData={form}
        onChange={handleChange}
        onSave={handleSave}
        onClose={cerrarModalActualizar}
      />

      <ModalForm
        isOpen={modalInsertar}
        title="Insertar nombre"
        fields={fields}
        formData={{ ...form, id: data.length + 1 }}
        onChange={handleChange}
        onSave={handleSave}
        onClose={cerrarModalInsertar}
      />
    </Container>
  );
};

export default Tables;
