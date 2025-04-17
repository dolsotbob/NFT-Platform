import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import NFT from "./pages/NFT";
import Mint from "./pages/Mint";
import './App.css';

function App() {
  return (
    // Router 옆에 basename 넣기 
    <Router>
      <Nav />
      {/* <main> 넣기  */}
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/nft" element={<NFT></NFT>} />
        <Route path="/mint" element={<Mint></Mint>} />
      </Routes>
    </Router>
  );
}

export default App;
