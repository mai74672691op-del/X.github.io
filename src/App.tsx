import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Layout } from './pages/Layout';
import { Home } from './pages/Home';
import { Works } from './pages/Works';
import { About } from './pages/About';
import { Musings } from './pages/Musings';
import { InitialLoader } from './components/InitialLoader';
import { useEffect, useState } from 'react';

function ForceRedirect() {
  const [hasRedirected, setHasRedirected] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasRedirected) {
      if (location.pathname !== '/') {
        navigate('/', { replace: true });
      }
      setHasRedirected(true);
    }
  }, [hasRedirected, location.pathname, navigate]);

  return null;
}

function App() {
  return (
    <>
      <InitialLoader />
      <HashRouter>
        <ForceRedirect />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="works" element={<Works />} />
            <Route path="about" element={<About />} />
            <Route path="musings" element={<Musings />} />
            {/* 刷新后自动重定向到首页（序章） */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
