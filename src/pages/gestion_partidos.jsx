import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'reactstrap';
import DataTable from '../components/date_table';
import ModalForm from '../components/modal_form';

const initialData = [
  { id: 1, personaje: "Naruto", anime: "Naruto" },
  { id: 2, personaje: "Goku", anime: "Dragon Ball" },
  { id: 3, personaje: "Kenshin Hiruma", anime: "Ruroni Kenshin" },
  { id: 4, personaje: "Monkey D. Luffy", anime: "One Piece" },
  { id: 5, personaje: "Edward Elric", anime: "Fullmetal Alchemist: Brotherhood" },
  { id: 6, personaje: "Seto Kaiba", anime: "Yu-Gi-oh!" },
];

const fields = [
    {name: "Campo", type: "text"},
    {name: "Deportivo", type: "text"},
    {name: "Liga", type: "text"},
    {name: "Torneo", type: "text"},
    {name: "Categoria", type: "text"},
    {name: "Equipo local", type: "text"},
    {name: "Equipo visitante", type: "text"},
    {name: "Fecha", type: "date"},
    {name: "Arbitro", type: "text"},
    {name: "Hora", type: "text"}
];

const Partidos = () => {
  const [data, setData] = useState(initialData);
  const [modalActualizar, setModalActualizar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [form, setForm] = useState({ id: "", personaje: "", anime: "" });

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
        title="Nuevo partido"
        fields={fields}
        formData={{...form, id: data.length + 1}}
        onChange={handleChange}
        onSave={insertar}
        onClose={cerrarModalInsertar}
      />
    </Container>
  );
};

export default Partidos;
