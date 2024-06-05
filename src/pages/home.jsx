import React, { useState, useEffect } from "react";

function Home() {
  const [usuario, setUsuario] = useState('');

  useEffect(() => {
    const storedUsuario = localStorage.getItem('usuario');
    if (storedUsuario) {
      const parsedUsuario = JSON.parse(storedUsuario);
      if (parsedUsuario.usuario) {
        setUsuario(parsedUsuario.usuario.usuario);
      }
    }
  }, []);

  return (
    <>
      <h1 className="Bienvenida">Bienvenido {usuario}</h1>
    </>
  );
}

export default Home;
