import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import './App.css';
import Home from './pages/home';
import Reportes from './pages/reportes';
import Partidos from './pages/gestion_partidos';
import Tables from './components/table';
import Estadisticas from './pages/estadisticas';
import Torneos from './pages/torneos';
import Register from './pages/register';
import Login from './pages/login';
import NotAuthenticated from './components/protected_non_user';
import Ligas from './pages/ligas';
import ImageUploadForm from './pages/img';

function App() {
  const isAuthenticated = !!localStorage.getItem('usuario');

  return (
      <>
          <BrowserRouter>
              <Navbar />
              <Routes>
                  <Route path='/' element={isAuthenticated ? <Home /> : <NotAuthenticated />} />
                  <Route path='/reportes' element={isAuthenticated ? <Reportes /> : <NotAuthenticated />} />
                  <Route path='/partidos' element={isAuthenticated ? <Partidos /> : <NotAuthenticated />} />
                  <Route path='/usuarios' element={isAuthenticated ? <Tables /> : <NotAuthenticated />} />
                  <Route path='/estadisticas' element={isAuthenticated ? <Estadisticas /> : <NotAuthenticated />} />
                  <Route path='/torneos' element={isAuthenticated ? <Torneos /> : <NotAuthenticated />} />
                  <Route path='/ligas' element={isAuthenticated ? <ImageUploadForm/> : <NotAuthenticated />} />
                  <Route path='/register' element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
                  <Route path='/login' element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
