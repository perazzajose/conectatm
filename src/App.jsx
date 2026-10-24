import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsappFloat from './components/WhatsappFloat';
import ScrollToHash from './components/ScrollToHash';
import Seo from './components/Seo';
import Home from './pages/home/Home';
import Laboral from './pages/laboral/Laboral';
import CvEditor from './pages/laboral/cv/CvEditor';
import Tutores from './pages/laboral/tutores/Tutores';
import Negocios from './pages/negocios/Negocios';
import Pos from './pages/negocios/pos/Pos';
import Emprendimientos from './pages/negocios/emprendimientos/Emprendimientos';
import Desarrollo from './pages/desarrollo/Desarrollo';
import Aprende from './pages/aprende/Aprende';
import Faq from './pages/faq/Faq';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';

// Usan Supabase y pdf.js: se cargan solo cuando alguien entra a esas páginas
const SubirCv = lazy(() => import('./pages/laboral/subir/SubirCv'));
const Reclutadores = lazy(() => import('./pages/laboral/reclutadores/Reclutadores'));

export default function App() {
  const { pathname } = useLocation();
  // En el editor de CV la barra de acciones ocupa el borde inferior: el botón flotante la taparía.
  const mostrarFlotante = pathname !== '/laboral/cv';

  return (
    <>
      <Navbar />
      <ScrollToHash />
      <Seo />
      <main>
        <Suspense fallback={<p className="cargando-pagina">Cargando…</p>}>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Cada parte está agrupada por prefijo para poder mudarla a su subdominio más adelante */}
          <Route path="/laboral" element={<Laboral />} />
          <Route path="/laboral/cv" element={<CvEditor />} />
          <Route path="/laboral/tutores" element={<Tutores />} />
          <Route path="/laboral/subir" element={<SubirCv />} />
          <Route path="/laboral/reclutadores" element={<Reclutadores />} />

          <Route path="/negocios" element={<Negocios />} />
          <Route path="/negocios/pos" element={<Pos />} />
          <Route path="/negocios/emprendimientos" element={<Emprendimientos />} />

          <Route path="/desarrollo" element={<Desarrollo />} />
          <Route path="/aprende" element={<Aprende />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Direcciones anteriores: siguen funcionando para enlaces viejos y Google */}
          <Route path="/tutores" element={<Navigate to="/laboral/tutores" replace />} />
          <Route path="/emprendimientos" element={<Navigate to="/negocios/emprendimientos" replace />} />
          <Route path="/pos" element={<Navigate to="/negocios/pos" replace />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      <Footer />
      {mostrarFlotante && <WhatsappFloat />}
    </>
  );
}
