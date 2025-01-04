// src/App.js

"use client";
import { useState } from "react";
import {
  blackScholesCallPriceHP,
  blackScholesPutPriceHP,
} from "../../lib/blackscholes";

function App() {
  // State for input parameters
  const [spot, setSpot] = useState(100);
  const [strike, setStrike] = useState(100);
  const [time, setTime] = useState(1.0); // in years
  const [rate, setRate] = useState(0.05); // 5%
  const [vol, setVol] = useState(0.2); // 20%

  // Compute prices using high-precision functions
  const callPrice = blackScholesCallPriceHP(spot, strike, time, rate, vol);
  const putPrice = blackScholesPutPriceHP(spot, strike, time, rate, vol);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>High-Precision Black-Scholes Demo</h1>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <label>Spot Price (S):</label>
          <br />
          <input
            type="number"
            step="0.01"
            value={spot}
            onChange={(e) => setSpot(parseFloat(e.target.value))}
          />
        </div>

        <div>
          <label>Strike (K):</label>
          <br />
          <input
            type="number"
            step="0.01"
            value={strike}
            onChange={(e) => setStrike(parseFloat(e.target.value))}
          />
        </div>

        <div>
          <label>Time to Maturity (T, years):</label>
          <br />
          <input
            type="number"
            step="0.1"
            value={time}
            onChange={(e) => setTime(parseFloat(e.target.value))}
          />
        </div>

        <div>
          <label>Risk-Free Rate (r):</label>
          <br />
          <input
            type="number"
            step="0.01"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
          />
        </div>

        <div>
          <label>Volatility (σ):</label>
          <br />
          <input
            type="number"
            step="0.01"
            value={vol}
            onChange={(e) => setVol(parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h2>Call Option Price: {callPrice.toFixed(4)}</h2>
        <h2>Put Option Price: {putPrice.toFixed(4)}</h2>
      </div>
    </div>
  );
}

export default App;
