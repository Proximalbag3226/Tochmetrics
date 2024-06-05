import React from "react";
import { useState, useEffect } from 'react';

function Home(){
const [usuario, setUsuario] = useState('');

  useEffect(() => {
    const storedUsuario = localStorage.getItem('usuario');
    if (storedUsuario) {
      const usuarioObjeto = JSON.parse(storedUsuario);
      setUsuario(usuarioObjeto.usuario);
    }
  }, []);
    return(
        <>
        <h1 className="Bienvenida">Bienvenido {usuario}</h1>
        </>
    );
}

export default Home