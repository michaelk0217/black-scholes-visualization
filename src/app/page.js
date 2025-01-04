"use client";

import { useState, useEffect } from "react";

import Header from "@/components/custom/Header";
import PriceCard from "@/components/custom/PriceCard";
import InputLabelSlider from "@/components/custom/InputLabelSlider";

import {
  blackScholesCallPriceHP,
  blackScholesPutPriceHP,
} from "@/lib/blackscholes";

export default function Home() {
  const [spot, setSpot] = useState(100);
  const [strike, setStrike] = useState(100);
  const [time, setTime] = useState(1.0); // in years
  const [rate, setRate] = useState(0.05); // 5%
  const [vol, setVol] = useState(0.2); // 20%

  const [callPrice, setCallPrice] = useState(0);
  const [putPrice, setPutPrice] = useState(0);

  useEffect(() => {
    setCallPrice(blackScholesCallPriceHP(spot, strike, time, rate, vol));
    setPutPrice(blackScholesPutPriceHP(spot, strike, time, rate, vol));
  }, [spot, strike, time, rate, vol]);

  return (
    <>
      <Header />

      <div className="flex flex-row justify-between items-stretch">
        <div className="flex flex-row gap-4 m-4">
          <PriceCard title="Call Option Price" price={callPrice.toFixed(2)} />
          <PriceCard title="Put Option Price" price={putPrice.toFixed(2)} />
        </div>

        <div className="flex flex-col gap-10 w-1/6 min-w-72 p-6">
          <InputLabelSlider
            label="Spot (S)"
            value={spot}
            max={1000}
            min={0}
            step={0.01}
            onChange={setSpot}
          />
          <InputLabelSlider
            label="Strike (K)"
            value={strike}
            max={1000}
            min={0}
            step={0.01}
            onChange={setStrike}
          />
          <InputLabelSlider
            label="Time (T, years)"
            value={time}
            max={10}
            min={0}
            onChange={setTime}
          />
          <InputLabelSlider
            label="Rate"
            desc="(r, annualized)"
            value={rate}
            max={0.1}
            min={0}
            step={0.001}
            onChange={setRate}
          />
          <InputLabelSlider
            label="Volatility"
            desc="(σ, annualized)"
            value={vol}
            max={0.5}
            min={0}
            step={0.001}
            onChange={setVol}
          />
        </div>
      </div>
    </>
  );
}
