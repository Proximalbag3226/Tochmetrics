import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [usuario, setUsuario] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsuario = localStorage.getItem('usuario');
        if (storedUsuario) {
            const usuarioObjeto = JSON.parse(storedUsuario);
            setUsuario(usuarioObjeto.usuario || usuarioObjeto);
        } else {
            navigate('/login'); 
        }
    }, [navigate]);

    return (
        <>
            <h1 className="Bienvenida">Bienvenido {usuario}</h1>
        </>
    );
}

export default Home;
