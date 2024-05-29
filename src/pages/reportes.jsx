import React, { useState } from "react";
import { Container, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody, Button} from "reactstrap";
import * as BsIcons from "react-icons/bs";
import ModalForm from "../components/modal_form";

const initialData = [
  { partido: 1, lugar: 'CDMX', fecha: 'Hoy', equipos: "Ny vs Ravens", description: "Hola este es un reporte"}
];

const fields = [
  { name: "partido", type: "text" },
  { name: "lugar", type: "text" },
  { name: "fecha", type: "date" },
  {name: "equipos", type: "text" },
  {name: "description", type: "text"}
];

function Reportes(){
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

    return(
        <div className="noc">
        <Container>
            <h1>Reportes <Button color="success" onClick={mostrarModalInsertar}>
            <BsIcons.BsPlusCircleFill/>
          </Button></h1>
            <br/>
            <br/>
        <UncontrolledAccordion defaultOpen="1">
  <AccordionItem>
    <AccordionHeader targetId="1">
      Reporte 1
    </AccordionHeader>
    <AccordionBody accordionId="1">
      <strong>
        This is the first item's accordion body.
      </strong>
      You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the{' '}
      <code>
        .accordion-body
      </code>
      , though the transition does limit overflow.
    </AccordionBody>
  </AccordionItem>
  <AccordionItem>
    <AccordionHeader targetId="2">
      Reporte 2
    </AccordionHeader>
    <AccordionBody accordionId="2">
      <strong>
        This is the second item's accordion body.
      </strong>
      You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the{' '}
      <code>
        .accordion-body
      </code>
      , though the transition does limit overflow.
    </AccordionBody>
  </AccordionItem>
  <AccordionItem>
    <AccordionHeader targetId="3">
      Reporte 3
    </AccordionHeader>
    <AccordionBody accordionId="3">
      <strong>
        This is the third item's accordion body.
      </strong>
      You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the{' '}
      <code>
        .accordion-body
      </code>
      , though the transition does limit overflow.
    </AccordionBody>
  </AccordionItem>
</UncontrolledAccordion>
<ModalForm
isOpen={modalInsertar}
title="Nuevo reporte"
fields={fields}
formData={{...form, partido: data.length + 1}}
onChange={handleChange}
onSave={insertar}
onClose={cerrarModalInsertar}/>
        </Container>
        </div>
    );
};

export default Reportes;