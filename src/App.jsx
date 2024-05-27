import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import './App.css'
import Home from './pages/home';
import Reportes from './pages/reportes';
import Partidos from './pages/gestion_partidos';
import Tables from './components/table';
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
          </Routes>
          </BrowserRouter>
          </>
  );
}

export default App;
