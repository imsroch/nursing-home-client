import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Contacto from './pages/Contacto';
import Formulario from './pages/Formulario';
import Home from './pages/Home';
import Institucional from './pages/Institucional';
import Servicios from './pages/Servicios';

function Landing() {
  return (
    <>
      <Home />
      <Institucional />
      <Servicios />
      <Contacto />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/formulario" element={<Formulario />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
