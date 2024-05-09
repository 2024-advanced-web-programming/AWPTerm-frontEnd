import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/nav/navBar';
import Top from './components/main/top';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Top />} />
          {/* 다른 라우팅 경로에 대한 Route 추가 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
