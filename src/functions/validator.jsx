const validateForm = (formData, fields) => {
    const errors = {};
  
    fields.forEach(field => {
      const value = formData[field.name];
  
      if (field.required && (!value || value.trim() === '')) {
        errors[field.name] = `${field.name.charAt(0).toUpperCase() + field.name.slice(1)} es requerido.`;
      }
  
      if (field.minLength && value.length < field.minLength) {
        errors[field.name] = `${field.name.charAt(0).toUpperCase() + field.name.slice(1)} debe tener al menos ${field.minLength} caracteres.`;
      }
  
      if (field.maxLength && value.length > field.maxLength) {
        errors[field.name] = `${field.name.charAt(0).toUpperCase() + field.name.slice(1)} no puede tener más de ${field.maxLength} caracteres.`;
      }
    });
  
    return errors;
  };

export default validateForm