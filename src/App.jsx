import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import './App.css'
import Home from './pages/home';
import Reportes from './pages/reportes';
import Partidos from './pages/gestion_partidos';
import Tables from './components/table';
import Estadisticas from './pages/estadisticas';
import Torneos from './pages/torneos';
import Register from './pages/register';
import Login from './pages/login';
function App() {
  return (
          <>
          <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' exact element={<Home/>}/>
            <Route path='/reportes' element={<Reportes/>}/>
            <Route path='/partidos' element={<Partidos/>}/>
            <Route path='/usuarios' element={<Tables/>}/>
            <Route path='/estadisticas' element={<Estadisticas/>}/>
            <Route path='/torneos' element = {<Torneos/>}/>
            <Route path='/register' element = {<Register/>}/>
            <Route path='/login' element = {<Login/>}/>
          </Routes>
          </BrowserRouter>
          </>
  );
}

export default App;
