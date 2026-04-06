import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";

const BlogListPage = lazy(() => import("./pages/BlogListPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const ContactoPage = lazy(() => import("./pages/ContactoPage"));
const PrivacidadPage = lazy(() => import("./pages/PrivacidadPage"));
const TerminosPage = lazy(() => import("./pages/TerminosPage"));
const ServiciosPage = lazy(() => import("./pages/ServiciosPage"));
const NosotrosPage = lazy(() => import("./pages/NosotrosPage"));
const MetodologiaPage = lazy(() => import("./pages/MetodologiaPage"));
const EcosistemaPage = lazy(() => import("./pages/EcosistemaPage"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-jhedai-secondary border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/metodologia" element={<MetodologiaPage />} />
          <Route path="/ecosistema" element={<EcosistemaPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/privacidad" element={<PrivacidadPage />} />
          <Route path="/terminos" element={<TerminosPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
