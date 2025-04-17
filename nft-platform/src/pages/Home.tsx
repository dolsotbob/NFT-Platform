import React, { useState } from "react";
import '../App.css'

function Home() {
    const [privateKey, setPrivateKey] = useState("");

    return (
        <div className="container">
            <input
                type="text"
                placeholder="Private Key를 넣어주세요."
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                className="input"
            ></input>
            <button className="button">Wallet Connect</button>
        </div>
    );
}

export default Home;
