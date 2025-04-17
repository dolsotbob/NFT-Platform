import React from 'react';
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
    return (
        <nav className="nav">
            <Link className="nav-item" to="/">홈</Link>
            <Link className="nav-item" to="/nft">NFT</Link>
            <Link className="nav-item" to="/mint">Mint</Link>
        </nav>
    );
}

export default Nav; 