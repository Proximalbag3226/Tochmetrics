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
      <ModalHeader toggle={onClose}>
        <div><h3>{title}</h3></div>
      </ModalHeader>

      <ModalBody>
        {fields.map((field) => (
          field.name && field.type ? (
            <FormGroup key={field.name}>
              <Label>
                {field.name.charAt(0).toUpperCase() + field.name.slice(1)}:
              </Label>
              {field.type === 'select' ? (
                <Input
                  type="select"
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={onChange}
                >
                  <option value="">Seleccione una opción</option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Input>
              ) : field.type === 'file' ? (
                <Input
                  type={field.type}
                  name={field.name}
                  onChange={onChange}
                  accept="image/*"
                />
              ) : (
                <Input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={onChange}
                  readOnly={field.readOnly || false}
                  required={field.required || false}
                />
              )}
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
