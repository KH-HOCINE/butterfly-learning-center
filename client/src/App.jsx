import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';
import NoticeDetail from './pages/NoticeDetail'; // Nouveau composant de page
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/notice/:id" element={<NoticeDetail />} /> {/* Route dynamique */}
      </Routes>
    </Router>
  );
}

export default App;