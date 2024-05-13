import './App.css';
import Menu from './components/menu';

function App() {
  return (
    <>
    <h1 className = "titulo">Tochmetrics</h1>
    <div className="opciones_inicio">
      <a href="#0" class="btn10">
      <span>Iniciar sesion</span>
      <div class="transition"></div>
      </a>
      <br/><br/><br/><br/><br/>
      <a href="#0" class="btn10">
      <span>Crear cuenta</span>
      <div class="transition"></div>
      </a>
    </div>
    </>
  );
}

export default App;
