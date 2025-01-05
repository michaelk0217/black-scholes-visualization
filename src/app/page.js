"use client";

import { useState, useEffect, useMemo } from "react";

import Header from "@/components/custom/Header";
import PriceCard from "@/components/custom/PriceCard";
import OptionInputs from "@/components/custom/OptionInputs";
import Heatmap from "@/components/custom/Heatmap";

import {
  blackScholesCallPriceHP,
  blackScholesPutPriceHP,
  generateHeatmapData,
} from "@/lib/blackscholes";

export default function Home() {
  // Main parameters
  const [spot, setSpot] = useState(100);
  const [strike, setStrike] = useState(100);
  const [time, setTime] = useState(1.0); // in years
  const [rate, setRate] = useState(0.05); // 5%
  const [vol, setVol] = useState(0.2); // 20%

  // Heatmap parameters
  const [minSpot, setMinSpot] = useState(80);
  const [maxSpot, setMaxSpot] = useState(120);
  const [stepsSpot, setStepsSpot] = useState(10);

  const [minVol, setMinVol] = useState(0.1);
  const [maxVol, setMaxVol] = useState(0.3);
  const [stepsVol, setStepsVol] = useState(10);

  // Generate Heatmap data
  const callHeatmapData = useMemo(() => {
    return generateHeatmapData({
      minSpot,
      maxSpot,
      stepsSpot,
      minVol,
      maxVol,
      stepsVol,
      strike,
      time,
      rate,
      blackScholesCallPrice: blackScholesCallPriceHP,
    });
  }, [
    minSpot,
    maxSpot,
    stepsSpot,
    minVol,
    maxVol,
    stepsVol,
    strike,
    time,
    rate,
  ]);

  const putHeatmapData = useMemo(() => {
    return generateHeatmapData({
      minSpot,
      maxSpot,
      stepsSpot,
      minVol,
      maxVol,
      stepsVol,
      strike,
      time,
      rate,
      blackScholesCallPrice: blackScholesPutPriceHP,
    });
  }, [
    minSpot,
    maxSpot,
    stepsSpot,
    minVol,
    maxVol,
    stepsVol,
    strike,
    time,
    rate,
  ]);

  // Prices
  const [callPrice, setCallPrice] = useState(10.45);
  const [putPrice, setPutPrice] = useState(5.57);

  // Calculate prices
  useEffect(() => {
    setCallPrice(blackScholesCallPriceHP(spot, strike, time, rate, vol));
    setPutPrice(blackScholesPutPriceHP(spot, strike, time, rate, vol));
  }, [spot, strike, time, rate, vol]);

  return (
    <>
      <Header />

      <div className="flex flex-row justify-between ">
        <div className="flex flex-col gap-4 m-4 h-full">
          <div className="flex flex-row gap-4 m-4 h-full">
            <PriceCard title="Call Option Price" price={callPrice.toFixed(2)} />
            <PriceCard title="Put Option Price" price={putPrice.toFixed(2)} />
          </div>

          <div className="flex flex-row gap-4">
            <Heatmap
              data={callHeatmapData}
              minSpot={minSpot}
              maxSpot={maxSpot}
              stepsSpot={stepsSpot}
              minVol={minVol}
              maxVol={maxVol}
              stepsVol={stepsVol}
              width={650}
              height={600}
            />

            <Heatmap
              data={putHeatmapData}
              minSpot={minSpot}
              maxSpot={maxSpot}
              stepsSpot={stepsSpot}
              minVol={minVol}
              maxVol={maxVol}
              stepsVol={stepsVol}
              width={650}
              height={600}
            />
          </div>
        </div>

        <OptionInputs
          spot={spot}
          setSpot={setSpot}
          strike={strike}
          setStrike={setStrike}
          time={time}
          setTime={setTime}
          rate={rate}
          setRate={setRate}
          vol={vol}
          setVol={setVol}
          minSpot={minSpot}
          setMinSpot={setMinSpot}
          maxSpot={maxSpot}
          setMaxSpot={setMaxSpot}
          minVol={minVol}
          setMinVol={setMinVol}
          maxVol={maxVol}
          setMaxVol={setMaxVol}
        />
      </div>
    </>
  );
}
