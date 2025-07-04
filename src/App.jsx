import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HeroFrequency from './components/HeroFrequency';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HeroFrequency />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;