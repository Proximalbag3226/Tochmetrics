import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Button, Label, Input, FormFeedback } from 'reactstrap';
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
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = 'Este campo es obligatorio';
      } else if (field.minLength && formData[field.name]?.length < field.minLength) {
        newErrors[field.name] = `Debe tener al menos ${field.minLength} caracteres`;
      } else if (field.maxLength && formData[field.name]?.length > field.maxLength) {
        newErrors[field.name] = `Debe tener máximo ${field.maxLength} caracteres`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave();
    }
  };

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
                  invalid={!!errors[field.name]}
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
                  invalid={!!errors[field.name]}
                />
              ) : (
                <Input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={onChange}
                  readOnly={field.readOnly || false}
                  required={field.required || false}
                  invalid={!!errors[field.name]}
                />
              )}
              {errors[field.name] && <FormFeedback>{errors[field.name]}</FormFeedback>}
            </FormGroup>
          ) : null
        ))}
      </ModalBody>

      <ModalFooter>
        <Button color="primary" onClick={handleSave}>
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
