import { Routes, Route } from 'react-router';
import { Analytics } from '@vercel/analytics/react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Lineup from './pages/Lineup';
import Tickets from './pages/Tickets';
import Info from './pages/Info';
import Faq from './pages/Faq';

export default function App() {
  // Layout uses the {children} pattern: it must wrap <Routes> (never <Outlet/>).
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lineup" element={<Lineup />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/info" element={<Info />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Analytics />
    </Layout>
  );
}
