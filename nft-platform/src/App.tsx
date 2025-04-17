import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import Viewer from "./pages/Viewer";
import Mint from "./pages/Mint";
import './App.css';

function App() {
  return (
    // Router 옆에 basename 넣기 
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Main></Main>} />
          <Route path="/viewer" element={<Viewer></Viewer>} />
          <Route path="/mint" element={<Mint></Mint>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
