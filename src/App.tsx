import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Nav from './components/Navbar';
import Home from './pages/Home';
import Contacto from './pages/Contacto';
import Formulario from './pages/Formulario';
import Institucional from './pages/Institucional';
import Servicios from './pages/Servicios';

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/institucional' element={<Institucional />} />
          <Route path='/servicios' element={<Servicios />} />
          <Route path='/contacto' element={<Contacto />} />
          <Route path='/formulario' element={<Formulario />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
