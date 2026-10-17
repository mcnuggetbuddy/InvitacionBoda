import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n';
import './estilos.css';

const App = lazy(() => import('./App.jsx'));
const SeatingChart = lazy(() => import('./components/SeatingChart.jsx'));

function Root() {
  const path = window.location.pathname.replace(/\/+$/, '');
  const isSeating = path === '/mesas' || path === '/seating';

  return (
    <Suspense fallback={null}>
      {isSeating ? <SeatingChart /> : <App />}
    </Suspense>
  );
}

createRoot(document.getElementById('root')).render(<Root />);
