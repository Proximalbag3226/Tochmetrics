import React from 'react';
import { Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Button, Label, Input } from 'reactstrap';
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
        {fields.map((field) => {
          if (!field.name || !field.type) return null;

          return (
            <FormGroup key={field.name}>
              <Label for={field.name}>
                {field.name.charAt(0).toUpperCase() + field.name.slice(1)}:
              </Label>
              {field.type === 'select' ? (
                <Input
                  id={field.name}
                  name={field.name}
                  type="select"
                  value={formData[field.name] || ''}
                  onChange={onChange}
                  readOnly={field.readOnly || false}
                >
                  {field.options && field.options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Input>
              ) : (
                <Input
                  className="form-control"
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  readOnly={field.readOnly || false}
                  onChange={onChange}
                  value={formData[field.name] || ''}
                />
              )}
            </FormGroup>
          );
        })}
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
