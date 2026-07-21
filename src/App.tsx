import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Contacto from './pages/Contacto';
import Home from './pages/Home';
import Institucional from './pages/Institucional';
import Servicios from './pages/Servicios';

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main>
        <Home />
        <Institucional />
        <Servicios />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}

export default App;
