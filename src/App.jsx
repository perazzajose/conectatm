import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsappFloat from './components/WhatsappFloat';
import ScrollToHash from './components/ScrollToHash';
import Home from './pages/home/Home';
import Tutores from './pages/tutores/Tutores';
import Emprendimientos from './pages/emprendimientos/Emprendimientos';
import Faq from './pages/faq/Faq';
import Pos from './pages/pos/Pos';
import PosNav from './pages/pos/PosNav';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';

export default function App() {
  const { pathname } = useLocation();
  // La página POS tenía su propia identidad visual (subdominio pos.conectatumundo.net)
  // así que usa su propio nav en vez del Navbar principal del sitio.
  const isPos = pathname.startsWith('/pos');

  return (
    <>
      {isPos ? <PosNav /> : <Navbar />}
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tutores" element={<Tutores />} />
        <Route path="/emprendimientos" element={<Emprendimientos />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/pos" element={<Pos />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <WhatsappFloat />
    </>
  );
}
