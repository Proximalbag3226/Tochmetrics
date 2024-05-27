import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import Partidos from '../pages/gestion_partidos';
import Usuarios from '../pages/usuarios';
import Estadisticas from '../pages/estadisticas';
import Reportes from '../pages/reportes';
import NotFound from '../pages/404';
import RegisterEmployee from '../pages/form';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={Home}/>
        <Route path="/partidos" component={Partidos} />
        <Route path="/usuarios" component={Usuarios} />
        <Route path="/estadisticas" component={Estadisticas} />
        <Route path="/reportes" component= {Reportes} />
        <Route path="/form" component={RegisterEmployee}/>
        <Route path = "*" component={NotFound} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;