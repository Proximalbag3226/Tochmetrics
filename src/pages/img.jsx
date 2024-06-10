import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!selectedFile) {
      setMessage('Por favor, seleccione una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://127.0.0.1:8000/imagenes/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Archivo subido:', response.data);
      setMessage('Imagen subida exitosamente.');
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      setMessage('Ocurrió un error al subir la imagen. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div>
      <h1>Subir Imagen</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Subir Imagen</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImageUploadForm;
