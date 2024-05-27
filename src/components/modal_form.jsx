import React from 'react';
import { Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Button } from 'reactstrap';

const ModalForm = ({ isOpen, title, fields, formData, onChange, onSave, onClose }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>
        <div><h3>{title}</h3></div>
      </ModalHeader>

      <ModalBody>
        {fields.map((field) => (
          field.name ? (
            <FormGroup key={field.name}>
              <label>
                {field.name.charAt(0).toUpperCase() + field.name.slice(1)}:
              </label>
              <input
                className="form-control"
                name={field.name}
                type={field.type}
                readOnly={field.readOnly}
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
        <Button className="btn btn-danger" onClick={onClose}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalForm;
