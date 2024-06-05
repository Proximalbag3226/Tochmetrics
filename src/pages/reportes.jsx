import React, { useState, useEffect } from "react";
import { Container, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody, Button } from "reactstrap";
import * as BsIcons from "react-icons/bs";
import axios from "axios";
import ModalForm from "../components/modal_form";

const fields = [
  { name: "num_partido", type: "text" },
  { name: "lugar", type: "text" },
  { name: "fecha", type: "date" },
  { name: "equipos", type: "text" },
  { name: "descripcion", type: "text" }
];

function Reportes() {
  const user = JSON.parse(localStorage.getItem('usuario'));
  const isHeadReferee = user && user.tipo === 'head_referee';
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalVerMas, setModalVerMas] = useState(false);
  const [form, setForm] = useState({ num_partido: "", lugar: "", fecha: "", equipos: "", descripcion: "" });
  const [currentData, setCurrentData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/reportes/obtener_reportes');
        setData(response.data);
      } catch (error) {
        console.error('Error obteniendo datos:', error);
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
    const nuevonum_partido = { ...form, num_partido: data.length + 1 };
    try {
      const response = await axios.post('http://127.0.0.1:8000/reportes/agregar_reporte', nuevonum_partido, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setData([...data, response.data]);
      setModalInsertar(false);
      setForm({ num_partido: "", lugar: "", fecha: "", equipos: "", descripcion: "" }); // Reset form after insertion
    } catch (error) {
      console.error('Error insertando dato:', error);
    }
  };

  return (
    <div className="noc">
      <Container>
        <h1>
          Reportes{" "}
          {isHeadReferee && (
          <Button color="success" onClick={mostrarModalInsertar}>
            <BsIcons.BsPlusCircleFill />
          </Button>
          )}
        </h1>
        <br />
        <br />
        <UncontrolledAccordion defaultOpen="1">
          {data.map((item, index) => (
            <AccordionItem key={index}>
              <AccordionHeader targetId={`${index + 1}`}>
                {`Reporte ${index + 1}`}
              </AccordionHeader>
              <AccordionBody accordionId={`${index + 1}`}>
                <strong>{item.equipos}</strong>
                <p>{item.descripcion}</p>
                <Button color="info" onClick={() => mostrarModalVerMas(item)}>
                  Ver más
                </Button>
              </AccordionBody>
            </AccordionItem>
          ))}
        </UncontrolledAccordion>
        <ModalForm
          isOpen={modalInsertar}
          title="Nuevo reporte"
          fields={fields}
          formData={{ ...form, num_partido: data.length + 1 }}
          onChange={handleChange}
          onSave={insertar}
          onClose={cerrarModalInsertar}
        />
      </Container>
    </div>
  );
};

export default Reportes;
