import React from 'react';
import { Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Button } from 'reactstrap';
import Graphic from './graphic';

export const ModalshowComponent = ({ isOpen, title, graphData, onClose }) => {
  return (
    <Modal isOpen={isOpen} toggle={onClose}>
      <ModalHeader toggle={onClose}>{title}</ModalHeader>
      <ModalBody>
        <Graphic data={graphData} />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose}>Cerrar</Button>
      </ModalFooter>
    </Modal>
  );
};

const ModalForm = ({ isOpen, title, fields, formData, onChange, onSave, onClose }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>
        <div><h3>{title}</h3></div>
      </ModalHeader>

      <ModalBody>
        {fields.map((field) => (
          field.name && field.type ? (
            <FormGroup key={field.name}>
              <label>
                {field.name.charAt(0).toUpperCase() + field.name.slice(1)}:
              </label>
              <input
                className="form-control"
                name={field.name}
                type={field.type}
                readOnly={field.readOnly || false}
                onChange={onChange}
                value={formData[field.name] || ''}
              />
            </FormGroup>
          ) : null
        ))}
      </ModalBody>

      <ModalFooter>
        <Button color="primary" onClick={onSave}>
          Guardar
        </Button>
        <Button color="danger" onClick={onClose}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalForm;
