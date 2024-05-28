import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'reactstrap';
import DataTable from './date_table';
import ModalForm from './modal_form';

const initialData = [
  { id: 1, nombre: "Naruto", tipo: "Arbitro" },
  { id: 2, nombre: "Goku", tipo: "Jugador" },
  { id: 3, nombre: "Kenshin Hiruma", tipo: "Organizador" },
  { id: 4, nombre: "Monkey D. Luffy", tipo: "Administrador" },
  { id: 5, nombre: "Edward Elric", tipo: "Arbitro" },
  { id: 6, nombre: "Seto Kaiba", tipo: "Entrenador" },
];

const fields = [
  { name: 'id', type: 'text', readOnly: true },
  { name: 'nombre', type: 'text' },
  { name: 'tipo', type: 'text' },
];

const Tables = () => {
  const [data, setData] = useState(initialData);
  const [modalActualizar, setModalActualizar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [form, setForm] = useState({ id: "", nombre: "", tipo: "" });

  const mostrarModalActualizar = (dato) => {
    setForm(dato);
    setModalActualizar(true);
  };

  const cerrarModalActualizar = () => setModalActualizar(false);

  const mostrarModalInsertar = () => setModalInsertar(true);

  const cerrarModalInsertar = () => setModalInsertar(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const editar = () => {
    const updatedData = data.map((registro) =>
      registro.id === form.id ? form : registro
    );
    setData(updatedData);
    setModalActualizar(false);
  };

  const eliminar = (dato) => {
    if (window.confirm(`Estás seguro que deseas eliminar el elemento ${dato.id}`)) {
      const filteredData = data.filter((registro) => registro.id !== dato.id);
      setData(filteredData);
    }
  };

  const insertar = () => {
    const valorNuevo = { ...form, id: data.length + 1 };
    setData([...data, valorNuevo]);
    setModalInsertar(false);
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
        onSave={editar}
        onClose={cerrarModalActualizar}
      />

      <ModalForm
        isOpen={modalInsertar}
        title="Insertar nombre"
        fields={fields}
        formData={{ ...form, id: data.length + 1 }}
        onChange={handleChange}
        onSave={insertar}
        onClose={cerrarModalInsertar}
      />
    </Container>
  );
};

export default Tables;
