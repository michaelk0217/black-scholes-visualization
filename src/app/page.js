"use client";

import { useState, useEffect } from "react";

import Header from "@/components/custom/Header";
import PriceCard from "@/components/custom/PriceCard";
import InputLabelSlider from "@/components/custom/InputLabelSlider";
// import Separator from "@/components/ui/separator";

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

  const [minSpot, setMinSpot] = useState(80);
  const [maxSpot, setMaxSpot] = useState(120);
  const [spotStep, setSpotStep] = useState(10);
  const [volStep, setVolStep] = useState(10);
  const [minVol, setMinVol] = useState(0.1);
  const [maxVol, setMaxVol] = useState(0.3);

  const [callPrice, setCallPrice] = useState(10.45);
  const [putPrice, setPutPrice] = useState(5.57);

  useEffect(() => {
    setCallPrice(blackScholesCallPriceHP(spot, strike, time, rate, vol));
    setPutPrice(blackScholesPutPriceHP(spot, strike, time, rate, vol));
  }, [spot, strike, time, rate, vol]);

  return (
    <>
      <Header />

      <div className="flex flex-row justify-between ">
        <div className="flex flex-row gap-4 m-4 h-full">
          <PriceCard title="Call Option Price" price={callPrice.toFixed(2)} />
          <PriceCard title="Put Option Price" price={putPrice.toFixed(2)} />
        </div>

        <div className="flex flex-col justify-start gap-6 w-1/6 min-w-72 p-6">
          <InputLabelSlider
            label="Spot Price (S)"
            value={spot}
            max={1000}
            min={0}
            step={0.01}
            onChange={setSpot}
          />
          <InputLabelSlider
            label="Strike Price (K)"
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
          <div className="shrink-0 bg-border h-[1px] w-full"></div>

          <InputLabelSlider
            label="Min Spot Price"
            value={minSpot}
            max={maxSpot - 0.01}
            min={0}
            step={0.01}
            onChange={setMinSpot}
          />
          <InputLabelSlider
            label="Max Spot Price"
            value={maxSpot}
            max={1000}
            min={minSpot}
            step={0.01}
            onChange={setMaxSpot}
          />
          <InputLabelSlider
            label="Min Volatility"
            value={minVol}
            max={maxVol - 0.001}
            min={0}
            step={0.001}
            onChange={setMinVol}
          />
          <InputLabelSlider
            label="Max Volatility"
            value={maxVol}
            max={0.5}
            min={minVol}
            step={0.001}
            onChange={setMaxVol}
          />
        </div>
      </div>
    </>
  );
}
