import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'reactstrap';
import DataTable from '../components/date_table';
import ModalForm from '../components/modal_form';
import validateForm from '../functions/validator';

const fields = [
  { name: 'id', type: 'text', readOnly: true },
  { name: 'campo', type: 'text', minLength: 5, maxLength: 25, required: true },
  { name: 'deportivo', type: 'text', minLength: 5, maxLength: 25, required: true },
  { name: 'liga', type: 'text', minLength: 5, maxLength: 25, required: true },
  { name: 'torneo', type: 'text', minLength: 5, maxLength: 25, required: true },
  { name: 'categoria', type: 'text', minLength: 5, maxLength: 25, required: true },
  { name: 'eq', type: 'text', minLength: 5, maxLength: 25, required: true },
  { name: 'ev', type: 'text', minLength: 5, maxLength: 25, required: true },
  { name: 'fecha', type: 'date', required: true },
  { name: 'arbitro', type: 'text', minLength: 5, maxLength: 25, required: true },
  { name: 'hora', type: 'time', required: true }
];

const Tables = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({campo: "", deportivo: "", liga: "", torneo: "", categoria: "", eq: "", ev: "", fecha: "", arbitro: "", hora: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalActualizar, setModalActualizar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  useEffect(() => {
    // Fetch initial data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/partidos/obtener_partido');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
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
        await axios.put(`http://127.0.0.1:8000/partidos/editar_partido/{id}?partido_id=${form.id}`, form, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setData((prevState) => prevState.map((item) => (item.id === form.id ? form : item)));
      } else {
        const response = await axios.post('http://127.0.0.1:8000/partidos/agregar_partido', form, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setData([...data, response.data]);
      }
      setModalActualizar(false);
      setModalInsertar(false);
      setForm({campo: "", deportivo: "", liga: "", torneo: "", categoria: "", eq: "", ev: "", fecha: "", arbitro: "", hora: "" });
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

  const eliminar = async (dato) => {
    if (window.confirm(`Estás seguro que deseas eliminar el elemento ${dato.id}`)) {
      try {
        await axios.delete(`http://127.0.0.1:8000/partidos/eliminar_partido/{id}?id_partido=${dato.id}`);
        setData(data.filter((registro) => registro.id !== dato.id));
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
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
