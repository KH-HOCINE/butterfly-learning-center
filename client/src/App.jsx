import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';
import NoticeDetail from './pages/NoticeDetail';
import About from './pages/About'; // <-- Nouvelle importation
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/notice/:id" element={<NoticeDetail />} />
        <Route path="/about" element={<About />} /> {/* <-- Nouvelle route dynamique */}
      </Routes>
    </Router>
  );
}

export default App;