import Footer from './components/Footer'
import Nav from './components/Navbar'
import Home from './pages/Home'
import Contacto from './pages/Contacto'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Institucional from './pages/Institucional';
import Servicios from './pages/Servicios';

function App() {

  return (
    <>
      <Router>
        <Nav />
          <Routes>
            <Route path='/' Component={Home} />
            <Route path='/institucional' Component={Institucional}/>
            <Route path='/servicios' Component={Servicios}/>
            <Route path='/contacto' Component={Contacto}/>
          </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
