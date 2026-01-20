import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import AdminLayout from './pages/admin/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Notices from './pages/public/Notices';
import Events from './pages/public/Events';
import Gallery from './pages/public/Gallery';
import Contact from './pages/public/Contact';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminNotices from './pages/admin/AdminNotices';
import AdminEvents from './pages/admin/AdminEvents';
import AdminGallery from './pages/admin/AdminGallery';

const App: React.FC = () => {
  return (
    <HashRouter>
      <ThemeProvider>
        <AuthProvider>
          <DataProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="notices" element={<Notices />} />
                <Route path="events" element={<Events />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="contact" element={<Contact />} />
              </Route>

              {/* Admin Login */}
              <Route path="/admin/login" element={<Login />} />

              {/* Protected Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="notices" element={<AdminNotices />} />
                <Route path="events" element={<AdminEvents />} />
                <Route path="gallery" element={<AdminGallery />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;